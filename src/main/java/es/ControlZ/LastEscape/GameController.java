package es.ControlZ.LastEscape;

import java.util.Collection;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {
	Map<Long, Player> players = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);
	
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
	
	@GetMapping(value = "/LastEscape")
	public Collection<Player> getPlayers() {
		return players.values();
	}
	
	@PostMapping(value = "/LastEscape")
	@ResponseStatus(HttpStatus.CREATED)
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
	
	@GetMapping(value = "/LastEscape/{id}")
	public ResponseEntity<Player> getPlayer(@PathVariable long id) {
		Player player = players.get(id);
		if (player != null) {
			return new ResponseEntity<>(player, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping(value = "/LastEscape/{id}")
	public ResponseEntity<Player> updatePlayer(@PathVariable long id, @RequestBody Player player) {
		Player savedPlayer = players.get(player.getId());
		if (savedPlayer != null) {
			players.put(id, player);
			return new ResponseEntity<>(player, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping(value = "/LastEscape/objetos/{id}")
	public ResponseEntity<String> updateObject(@PathVariable int id, @RequestBody String item) {
		if (id < 64) {
			listaObjetos[id] = item;
			return new ResponseEntity<>(item, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}



