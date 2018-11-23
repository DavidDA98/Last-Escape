package es.ControlZ.LastEscape;

public class Player {
	private long id;
	private int x, y;
	private float rotacion = 0;
	private int muerto = 0;
	
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
	
	public void setRotacion(float r) {
		this.rotacion = r;
	}
	
	public int getMuerto() {
		return muerto;
	}
	
	public void setMuerto(int m) {
		this.muerto = m;
	}
}