package com.example.proyectomarket

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AlertDialog
import com.google.firebase.auth.FirebaseAuth
import kotlinx.android.synthetic.main.activity_auth.*
import android.app.ProgressDialog
import android.widget.Toast

class AuthActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_auth)


        //setup
        setup()
    }

    private fun setup(){
        title = "Login"
        var email = ETEMAILAUTH.text
        var password = ETPASSWORDAUTH.text

        BTNREGISTRAR_USUARIO.setOnClickListener {

            if(email.isNotEmpty() && password.isNotEmpty()) {
                var progreso = ProgressDialog.show(this,
                        "Cargando Datos","Espere un Momento ...", true)
                FirebaseAuth.getInstance().signInWithEmailAndPassword(
                    email.toString(), password.toString()
                ).addOnCompleteListener {
                    Toast.makeText(applicationContext,
                            "Datos guardados correctamente", Toast.LENGTH_SHORT).show()

                    if(it.isSuccessful) {
                        var intent = Intent(this, HomeActivity::class.java)
                        startActivity(intent)
                        progreso.dismiss()
                    } else {
                        showAlert("ERROR", "Contraseña o usuario incorrecto")
                        progreso.dismiss()
                    }
                }
            }
        }
    }

    private fun showAlert(title:String, message:String){
        var builder = AlertDialog.Builder(this)
        builder.setTitle(title)
        builder.setMessage(message)
        builder.setPositiveButton("Aceptar", null)
        var dialog: AlertDialog = builder.create()
        dialog.show()
    }

    fun redirectRegister(v:View){
        var intent:Intent = Intent(this, RegisterActivity::class.java)
        startActivity(intent)
    }
}