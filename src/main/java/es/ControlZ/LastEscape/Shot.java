package es.ControlZ.LastEscape;

public class Shot {
	private int x, y, disparo;
	
	Shot() {
		this.x = 0;
		this.y = 0;
		this.disparo = 0;
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
	
	public int getDisparo() {
		return disparo;
	}
	
	public void setDisparo(int disparo) {
		this.disparo = disparo;
	}
	
	@Override
	public String toString() {
		return "{\"x\":" + this.x + ",\"y\":" + this.y + ",\"hayDisparo\":" + this.disparo + "}";
	}
}