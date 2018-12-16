package es.ControlZ.LastEscape;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class Application implements WebSocketConfigurer {
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(gameHandler(), "/game").setAllowedOrigins("*");
	}
	
	@Bean
	public WebsocketGameHandler gameHandler() {
		return new WebsocketGameHandler();
	}
	
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}