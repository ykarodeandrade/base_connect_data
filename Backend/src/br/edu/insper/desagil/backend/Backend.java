package br.edu.insper.desagil.backend;

import br.edu.insper.desagil.backend.database.firestore.Firestore;
import br.edu.insper.desagil.backend.httpserver.HTTPServer;

public final class Backend {
	public static final String CREDENTIALS_TEST = "firestore_test.json";

	private static final String CREDENTIALS = "firestore.json";

	private static final int PORT = 8080;

	private static final boolean EXPOSE = false;

	private static final boolean TEST = true;

	public static final void main(String[] args) {
		if (TEST) {
			Firestore.start(CREDENTIALS_TEST);
		} else {
			Firestore.start(CREDENTIALS);
		}
		HTTPServer.start(PORT, EXPOSE);
	}
}
