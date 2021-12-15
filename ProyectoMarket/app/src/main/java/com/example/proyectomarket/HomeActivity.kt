package com.example.proyectomarket

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.*
import androidx.appcompat.app.ActionBar
import com.google.firebase.auth.FirebaseAuth

class HomeActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        //Remove title bar
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        //Remove notification bar
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        //set content view AFTER ABOVE sequence (to avoid crash)
        this.setContentView(R.layout.activity_home);

        setContentView(R.layout.activity_home)
    }

    fun RedirectCreateProduc(v: View){
        var intent = Intent(this, createProductoActivity::class.java)
        startActivity(intent)
    }

    fun RedirectCreateCategoria(v:View){
        var intent = Intent(this, createCategoriaActivity::class.java)
        startActivity(intent)
    }

    fun RedirectCreateProveedor(v:View){
        var intent = Intent(this, createProveedorActivity::class.java)
        startActivity(intent)
    }

    fun RedirectGetUsuario(v:View){
        var intent = Intent(this, GetUsuarioActivity::class.java)
        startActivity(intent)
    }
}