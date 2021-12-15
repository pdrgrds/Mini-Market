package com.example.proyectomarket

import android.content.ContentValues
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import com.example.proyectomarket.model.Categoria
import com.example.proyectomarket.model.Usuario
import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.android.synthetic.main.activity_get_categoria.*
import kotlinx.android.synthetic.main.activity_get_usuario.*

class GetUsuarioActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_get_usuario)
        title = "Buscar Usuario"
    }

    var uid:String = ""

    fun buscarUsuario(v:View){
        var correo = ETCORREOUSUARIO_B.text
        if(correo.isNotEmpty()){
            val db = FirebaseFirestore.getInstance()
            val usuarios = db.collection("Usuarios").whereEqualTo("correo", correo.toString())
            usuarios.get()
                .addOnSuccessListener { snapshot ->
                    if (snapshot != null && snapshot.documents.size !== 0) {
                        val data = snapshot.documents[0]
                        escribirInputs(data)
                    } else {
                        Toast.makeText(applicationContext, "No se encontró el Usuario ${correo}", Toast.LENGTH_LONG).show()
                        limpiarInputs()
                    }
                }
                .addOnFailureListener { exception ->
                    Log.d(ContentValues.TAG, "get failed with ", exception)
                }
        }
    }

    fun escribirInputs(data: DocumentSnapshot){
        ETCORREOUSUARIO_E.setText(data.get("correo").toString());
        ETAPELLIDOUSUARIO_E.setText(data.get("apellido").toString());
        ETNOMBREUSUARIO_E.setText(data.get("nombre").toString());
        uid=data.id
    }

    fun limpiarInputs(){
        ETCORREOUSUARIO_E.setText("");
        ETAPELLIDOUSUARIO_E.setText("");
        ETNOMBREUSUARIO_E.setText("");
        uid="";
    }

    fun actualizarUsuario(v:View){
        var correo = ETCORREOUSUARIO_E.text.toString();
        var apellido = ETAPELLIDOUSUARIO_E.text.toString();
        var nombre = ETNOMBREUSUARIO_E.text.toString();

        var user = Usuario(correo, nombre, apellido)
        val db = FirebaseFirestore.getInstance()

        db.collection("Usuarios").document(uid).set(user).addOnSuccessListener {
            Toast.makeText(applicationContext, "Usuario ${correo} actualizado OK", Toast.LENGTH_LONG).show()
        }.addOnFailureListener { exception ->
            Log.d(ContentValues.TAG, "Error", exception) }
    }

    fun cerrarUsuario(v:View){
        finish()
    }

    fun listarUsuario(v:View){
        var intent = Intent(this, ListUsuarioActivity::class.java)
        startActivity(intent)
    }
}