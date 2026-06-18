import { SQLiteDatabase } from "expo-sqlite";

export async function inicializarBanco(db: SQLiteDatabase){
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS agendamentos(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            telefone TEXT NOT NULL,
            data TEXT NOT NULL,
            horario TEXT NOT NULL,
            tipo_tranca TEXT NOT NULL,
            foto_uri TEXT 
        )`);

}