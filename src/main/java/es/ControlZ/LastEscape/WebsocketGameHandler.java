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
	
	Shot[] disparos = {new Shot(), new Shot()};
	
	int[] spawnsX = {480, 2750, 2560, 260};
	int[] spawnsY = {370, 170, 1750, 1770};
	
	String[] listaObjetos = {
			"vacio", "vacio", "vacio", "vacio", "vacio", "vacio", "vacio", "vacio", "vacio", "vacio", "vacio",
		    "vacio", "vacio", "vacio", "vacio", "vacio", "vacio", "vacio", "vacio", "vacio", "vacio", "vacio", 
		    "fusible", "fusible", "fusible", "fusible", "botiquin", "botiquin", "botiquin", "botiquin", "botiquin", "botiquin",
		    "identificacion1", "identificacion2", "identificacion3", "identificacion4", "identificacion5", "identificacion6",
		    "medicina", "medicina", "medicina", "medicina", "medicina", "medicina", "medicina", "medicina", "medicina", "medicina",
		    "pilas", "pilas", "pilas", "pilas", "pilas", "pilas", "pilas", "pilas", "balas", "balas", "balas", "balas", "balas",
		    "balas", "balas", "balas"
	};
	
	String[] listaIDs = {
			"identificacion1", "identificacion2", "identificacion3", "identificacion4", "identificacion5", "identificacion6"
	};
	
	String idCorrecta = listaIDs[ThreadLocalRandom.current().nextInt(1, 7)];
	int fusiblesRestantes = 4;
	
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
			ObjectNode wNodeAux = mapper.createObjectNode();
			String msg;
			
			switch (metodo) {
			
				//Devuelve el numero de jugadores
				case "getNumPlayers":
					wNode = mapper.createObjectNode();
					
					wNode.put("metodo", "getNumPlayers");
					wNode.put("longitud", getPlayers());
					
					msg = wNode.toString();
					session.sendMessage(new TextMessage(msg));
					break;
					
				//Crea un nuevo jugador
				case "createPlayer":
					wNode = mapper.createObjectNode();
					wNodeAux = mapper.createObjectNode();
					
					Player p = createPlayer();
					
					wNode.put("metodo", "createPlayer");
					wNodeAux.put("id", p.getId());
					wNodeAux.put("x", p.getX());
					wNodeAux.put("y", p.getY());
					wNode.set("jugador", wNodeAux);
					
					msg = wNode.toString();
					session.sendMessage(new TextMessage(msg));
					break;
					
				//Actualiza la posicion del jugador	
				case "putPlayer":
					rNode = rNode.get("jugador");
					
					Player up = new Player();
					
					up.setId(rNode.get("id").asLong());
					up.setX(rNode.get("x").asInt());
					up.setY(rNode.get("y").asInt());
					up.setRotacion(rNode.get("rotacion").floatValue());
					up.setMuerto(rNode.get("muerto").asInt());
					up.setSalida(rNode.get("salida").asInt());
					
					updatePlayer(up);
					break;
					
				//Devuelve el estado del juego	
				case "getGameState":
					long id;
					
					//Recibe los datos del jugador contrario
					if (rNode.get("id").asLong() == 1) {
						id = 2;
					} else {
						id = 1;
					}
					
					Player gp = players.get(id);
					
					wNode = mapper.createObjectNode();
					wNodeAux = mapper.createObjectNode();
					ArrayNode array = mapper.createArrayNode();
					
					wNode.put("metodo", "getGameState");
					
					wNodeAux.put("id", gp.getId());
					wNodeAux.put("x", gp.getX());
					wNodeAux.put("y", gp.getY());
					wNodeAux.put("rotacion", gp.getRotacion());
					wNodeAux.put("muerto", gp.getMuerto());
					wNodeAux.put("salida", gp.getSalida());
					
					wNode.set("jugador", wNodeAux);
					
					wNodeAux = mapper.createObjectNode();
					wNodeAux.put("x", disparos[(int) id - 1].getX());
					wNodeAux.put("y", disparos[(int) id - 1].getY());
					wNodeAux.put("hayDisparo", disparos[(int) id - 1].getDisparo());
					disparos[(int) id - 1].setDisparo(0);
					
					wNode.set("disparo", wNodeAux);
					
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
					
				//Actualiza si un jugador ha disparado
				case "putDisparo":
					int idShot = rNode.get("id").asInt();
					idShot -= 1;
					
					rNode = rNode.get("disparo");
					
					disparos[idShot].setX(rNode.get("x").asInt());
					disparos[idShot].setY(rNode.get("y").asInt());
					disparos[idShot].setDisparo(rNode.get("disparo").asInt());
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
				
				case "deletePlayers":
					players.clear();
					nextId.set(0);
					break;
			}
		}
	}
	
	public int getPlayers() {
		return players.size();
	}
	
	public Player createPlayer() {
		Player player = new Player();
		long id = nextId.incrementAndGet();
		player.setId(id);
		if (id == 1) {
			player.setX(spawnsX[0]);
			player.setY(spawnsY[0]);
			mezclarArray(listaObjetos);
			mezclarArray(listaObjetos);
			mezclarArray(listaObjetos);
		} else {
			player.setX(spawnsX[1]);
			player.setY(spawnsY[1]);
		}
		players.put(player.getId(), player);
		return player;
	}
	
	public void updatePlayer(Player player) {
		Player savedPlayer = players.get(player.getId());
		if (savedPlayer != null) {
			players.put(player.getId(), player);
		}
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
