package es.ControlZ.LastEscape;

import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketGameHandler extends TextWebSocketHandler {
	
	private static Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());
	
	Map<Long, Player> players = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);
	
	int[] spawnsX = {480, 2750, 2560, 260};
	int[] spawnsY = {370, 170, 1750, 1770};
	
	String[] listaObjetos = {
			"ballesta", "fusil", "fusil", "subfusil", "subfusil", "subfusil", "subfusil", "vacio", "vacio", "vacio", "vacio",
		    "vacio", "vacio", "vacio", "vacio", "vacio", "vacio", "vacio", "balas", "balas", "balas", "balas", 
		    "fusible", "fusible", "fusible", "fusible", "botiquin", "botiquin", "botiquin", "botiquin", "botiquin", "botiquin",
		    "identificacion1", "identificacion2", "identificacion3", "identificacion4", "identificacion5", "identificacion6",
		    "medicina", "medicina", "medicina", "medicina", "medicina", "medicina", "medicina", "medicina", "medicina", "medicina",
		    "pilas", "pilas", "pilas", "pilas", "pilas", "pilas", "pilas", "pilas", "balas", "balas", "balas", "balas", "balas",
		    "balas", "balas", "balas"
	};
	
	String idCorrecta = "identificacion" + ThreadLocalRandom.current().nextInt(1, 7);
	int fusiblesRestantes = 4;
	
	int gameInProgress = 0;
	int jugadoresOnline = 0;
	
	ObjectMapper mapper = new ObjectMapper();
	
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
	}
	
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		synchronized (sessions) {
			//Lee el metodo
			JsonNode rNode = mapper.readTree(message.getPayload());
			String metodo = rNode.get("metodo").asText();
			
			ObjectNode wNode = mapper.createObjectNode();
			String msg;
			
			switch (metodo) {
			
				//Devuelve el numero de jugadores
				case "getMatchmakingState":
					wNode = mapper.createObjectNode();
					
					wNode.put("metodo", "getMatchmakingState");
					wNode.put("jugadores", players.size());
					wNode.put("gameState", gameInProgress);
					
					msg = wNode.toString();
					session.sendMessage(new TextMessage(msg));
					break;
					
				//Crea un nuevo jugador
				case "createPlayer":
					wNode = mapper.createObjectNode();
					
					wNode.put("metodo", "createPlayer");
					wNode.putPOJO("jugador", createPlayer(rNode.get("skin").asText()));
					
					msg = wNode.toString();
					session.sendMessage(new TextMessage(msg));
					break;
					
				//Actualiza la posicion del jugador	
				case "putPlayer":
					players.get(rNode.path("jugador").get("id").asLong()).setX(
						rNode.path("jugador").get("x").asInt()
					);
					players.get(rNode.path("jugador").get("id").asLong()).setY(
						rNode.path("jugador").get("y").asInt()
					);
					players.get(rNode.path("jugador").get("id").asLong()).setRotacion(
						rNode.path("jugador").get("rotacion").floatValue()
					);
					players.get(rNode.path("jugador").get("id").asLong()).setMuerto(
						rNode.path("jugador").get("muerto").asInt()
					);
					players.get(rNode.path("jugador").get("id").asLong()).setSalida(
						rNode.path("jugador").get("salida").asInt()
					);
					players.get(rNode.path("jugador").get("id").asLong()).setSkin(
						rNode.path("jugador").get("skin").asText()
					);
					
					break;
					
				//Devuelve el estado del juego	
				case "getGameState":
					wNode = mapper.createObjectNode();
					ArrayNode array = mapper.createArrayNode();
					
					long id = 1;
					
					wNode.put("metodo", "getGameState");
					
					wNode.putPOJO("jugador1", players.get(id));
					
					id++;
					wNode.putPOJO("jugador2", players.get(id));
					
					if (jugadoresOnline > 2) {
						id++;
						wNode.putPOJO("jugador3", players.get(id));
					}
					
					if (jugadoresOnline > 3) {
						id++;
						wNode.putPOJO("jugador4", players.get(id));
					}
					
					array = mapper.valueToTree(listaObjetos);
					wNode.set("items", array);
					
					wNode.put("fusiblesRestantes", fusiblesRestantes);
					
					msg = wNode.toString();
					session.sendMessage(new TextMessage(msg));
					
					break;
				
				//Coloca el nuevo item en la lista de objetos
				case "putItem":
					listaObjetos[rNode.get("indice").asInt()] = rNode.get("item").asText();
					break;
					
				//Envia el disparo a los demas jugadores
				case "putDisparo":
					for(WebSocketSession s : sessions) {
						if (s != session) {
							s.sendMessage(message);
						}
					}
					break;
					
				//Envia el cadaver a los demas jugadores
				case "sendCadaver":
					for(WebSocketSession s : sessions) {
						if (s != session) {
							s.sendMessage(message);
						}
					}
					break;
					
				//Envia los datos del cadaver destruido a los demas jugadores
				case "cadaverDestruido":
					for(WebSocketSession s : sessions) {
						if (s != session) {
							s.sendMessage(message);
						}
					}
					break;
				
				//Actualiza los fusibles restantes
				case "putFusibles":
					fusiblesRestantes = rNode.get("fusiblesRestantes").asInt();
					break;
				
				//Devuelve la identificación correcta
				case "getId":
					wNode.put("metodo", "getId");
					wNode.put("id", idCorrecta);
					
					msg = wNode.toString();
					session.sendMessage(new TextMessage(msg));
					break;
					
				case "comenzarJuego":
					gameInProgress = 1;
					jugadoresOnline = players.size();
					break;
				
				case "deletePlayers":
					players.clear();
					nextId.set(0);
					gameInProgress = 0;
					break;
			}
		}
	}
	
	public Player createPlayer(String skin) {
		Player player = new Player();
		long id = nextId.incrementAndGet();
		player.setId(id);
		if (id == 1) {
			player.setX(spawnsX[0]);
			player.setY(spawnsY[0]);
			//mezclarArray(listaObjetos);
			//mezclarArray(listaObjetos);
			//mezclarArray(listaObjetos);
		} else if (id == 2 ){
			player.setX(spawnsX[1]);
			player.setY(spawnsY[1]);
		} else if (id == 3 ){
			player.setX(spawnsX[2]);
			player.setY(spawnsY[2]);
		} else {
			player.setX(spawnsX[3]);
			player.setY(spawnsY[3]);
		}
		player.setSkin(skin);
		players.put(player.getId(), player);
		return player;
	}
	
	static void mezclarArray(String[] ar) {
	    for (int i = ar.length - 1; i > 0; i--) {
		    Random rnd = ThreadLocalRandom.current();
		    int indice = rnd.nextInt(i + 1);
		    String s = ar[indice];
		    ar[indice] = ar[i];
		    ar[i] = s;
	    }
	}
}
