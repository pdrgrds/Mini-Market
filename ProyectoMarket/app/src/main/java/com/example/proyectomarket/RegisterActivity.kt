package com.example.proyectomarket

import android.content.ContentValues
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import com.example.proyectomarket.model.Usuario
import com.google.android.gms.tasks.Task
import com.google.firebase.auth.AuthResult
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.android.synthetic.main.activity_register.*

class RegisterActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)
        title="Registrar Usuario"
    }

    fun Register(v:View){
        var email = ETCORREO_REGISTER.text
        var password = ETPASSWORD_REGISTER.text
        var nombre = ETNOMBRE_REGISTER.text
        var apellido = ETAPELLIDO_REGISTER.text

        if(email.isNotEmpty() && password.isNotEmpty() && nombre.isNotEmpty() && apellido.isNotEmpty()){
            FirebaseAuth.getInstance().createUserWithEmailAndPassword(email.toString(), password.toString()).addOnCompleteListener { task: Task<AuthResult> ->
                if (task.isSuccessful) {
                    var user:Usuario = Usuario(email.toString(), nombre.toString(), apellido.toString())
                    val db = FirebaseFirestore.getInstance()
                    db.collection("Usuarios").add(user).addOnSuccessListener {
                        Log.e("Success", "Usuario Creado");
                        Toast.makeText(applicationContext, "Usuario Registrado exitosamente", Toast.LENGTH_LONG).show()

                    }.addOnFailureListener { exception ->
                        Log.d(ContentValues.TAG, "Error", exception) }
                } else {
                    Toast.makeText(applicationContext, "Usuario ya registrado", Toast.LENGTH_LONG).show()
                }
            }
        }
    }

    fun Regresar(v:View){
        finish()
    }
}