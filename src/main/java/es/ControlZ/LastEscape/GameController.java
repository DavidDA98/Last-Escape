package es.ControlZ.LastEscape;

import java.util.Collection;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadLocalRandom;
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
	
	int fusiblesRestantes = 4;
	
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
			//mezclarArray(listaObjetos);
			//mezclarArray(listaObjetos);
			//mezclarArray(listaObjetos);
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
	
	@GetMapping(value = "/LastEscape/objetos")
	public String[] getItems() {
		return listaObjetos;
	}
	
	@PutMapping(value = "/LastEscape/disparo/{id}")
	public ResponseEntity<Shot> updateShot(@PathVariable long id, @RequestBody Shot d) {
		if (id == 1) {
			disparos[0] = d;
			disparos[0].setDisparo(1);
			return new ResponseEntity<>(d, HttpStatus.OK);
		} else if (id == 2 ){
			disparos[1] = d;
			disparos[1].setDisparo(1);
			return new ResponseEntity<>(d, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping(value = "/LastEscape/disparo/{id}")
	public ResponseEntity<Shot> getShot(@PathVariable long id) {
		Shot s = new Shot();
		if (id == 1) {
			s.setX(disparos[0].getX());
			s.setY(disparos[0].getY());
			s.setDisparo(disparos[0].getDisparo());
			disparos[0].setDisparo(0);
			return new ResponseEntity<>(s, HttpStatus.OK);
		} else if (id == 2 ){
			s.setX(disparos[1].getX());
			s.setY(disparos[1].getY());
			s.setDisparo(disparos[1].getDisparo());
			disparos[1].setDisparo(0);
			return new ResponseEntity<>(s, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping(value = "/LastEscape/id")
	public String getID() {
		return listaIDs[ThreadLocalRandom.current().nextInt(1, 7)];
	}
	
	@PutMapping(value = "/LastEscape/fusible")
	public ResponseEntity<String> restarFusible() {
		if (fusiblesRestantes > 0) {
			fusiblesRestantes--;
			return new ResponseEntity<>("", HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping(value = "/LastEscape/fusible")
	public int getFusibles() {
		return fusiblesRestantes;
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



