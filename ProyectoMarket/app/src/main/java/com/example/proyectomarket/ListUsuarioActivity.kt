package com.example.proyectomarket

import android.content.ContentValues
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.ArrayAdapter
import com.example.proyectomarket.model.Categoria
import com.example.proyectomarket.model.Usuario
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.android.synthetic.main.activity_list_categoria.*
import kotlinx.android.synthetic.main.activity_list_usuario.*

class ListUsuarioActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_list_usuario)
        title = "Lista Usuario"
        listaUsuario()
    }

    fun listaUsuario() {
        val db = FirebaseFirestore.getInstance()
        val usuarios = db.collection("Usuarios")
        var lista = ArrayList<Usuario>();

        usuarios.get()
            .addOnSuccessListener { document ->
                if (document != null) {

                    val list = document.documents;
                    for (i in list) run {
                        var cad: Usuario
                        cad = Usuario(i.get("correo").toString(), i.get("nombre").toString(), i.get("apellido").toString())
                        lista.add(cad);
                    }
                    mostrarUsuario(lista);
                } else {
                    Log.d(ContentValues.TAG, "No such document")
                }
            }
            .addOnFailureListener { exception ->
                Log.d(ContentValues.TAG, "get failed with ", exception)
            }
    }

    fun mostrarUsuario(cadena:ArrayList<Usuario>) {
        try {
            var lista=ArrayList<String>()
            var cad="";
            var json = cadena;
            var Contador:Int = json.size - 1;

            for (i in 0..Contador )
            {
                cad = json[i].correo + "\n" +
                        json[i].nombre + "\n" +
                        json[i].apellido + "\n"
                lista.add(cad);
            }

            var adaptador = ArrayAdapter<String>(
                this,
                android.R.layout.simple_list_item_1,
                lista
            )

            LVUSUARIOS.adapter = adaptador
        }catch (ex:Exception){
            Log.e("error", ex.message.toString())
        }

    }
}