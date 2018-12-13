package es.ControlZ.LastEscape;

public class Player {
	private long id;
	private int x, y;
	private float rotacion = 0;
	private int muerto = 0;
	private int salida = 0;
	private String skin;

	Player() {
		
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public float getRotacion() {
		return rotacion;
	}

	public void setRotacion(float rotacion) {
		this.rotacion = rotacion;
	}

	public int getMuerto() {
		return muerto;
	}

	public void setMuerto(int muerto) {
		this.muerto = muerto;
	}

	public int getSalida() {
		return salida;
	}

	public void setSalida(int salida) {
		this.salida = salida;
	}

	public String getSkin() {
		return skin;
	}

	public void setSkin(String skin) {
		this.skin = skin;
	}
	
	@Override
	public String toString() {
		return "{\"id\":" + this.id + ",\"x\":" + this.x + ",\"y\":" + this.y + ",\"rotacion\":" + this.rotacion + 
				",\"muerto\":" + this.muerto + ",\"salida\":" + this.salida + ",\"skin\":\"" + this.skin + "\"}";
	}
}


