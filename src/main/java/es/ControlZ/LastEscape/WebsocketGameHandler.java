package es.ControlZ.LastEscape;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketGameHandler extends TextWebSocketHandler {
	
	Map<Long, Player> players = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);
	
	int[] spawnsX = {480, 2750, 2560, 260};
	int[] spawnsY = {370, 170, 1750, 1770};
	
	ObjectMapper mapper = new ObjectMapper();
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		JsonNode rNode = mapper.readTree(message.getPayload());
		String metodo = rNode.get("metodo").asText();
		
		if (metodo.equals("getNumPlayers")) {
			ObjectNode wNode = mapper.createObjectNode();
			
			wNode.put("metodo", "getNumPlayers");
			wNode.put("longitud", getPlayers());
			
			String msg = wNode.toString();
			session.sendMessage(new TextMessage(msg));
		}
		
		if (metodo.equals("createPlayer")) {
			ObjectNode wNode = mapper.createObjectNode();
			ObjectNode wNode2 = mapper.createObjectNode();
			
			Player p = newPlayer();
			
			wNode.put("metodo", "createPlayer");
			wNode2.put("id", p.getId());
			wNode2.put("x", p.getX());
			wNode2.put("y", p.getY());
			wNode.set("jugador", wNode2);
			
			String msg = wNode.toString();
			session.sendMessage(new TextMessage(msg));
		}
	}
	
	public int getPlayers() {
		return players.size();
	}
	
	public Player newPlayer() {
		Player player = new Player();
		long id = nextId.incrementAndGet();
		player.setId(id);
		if (id == 1) {
			player.setX(spawnsX[0]);
			player.setY(spawnsY[0]);
		} else {
			player.setX(spawnsX[1]);
			player.setY(spawnsY[1]);
		}
		players.put(player.getId(), player);
		return player;
	}
}
