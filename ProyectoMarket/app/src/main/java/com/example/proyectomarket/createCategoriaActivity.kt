package com.example.proyectomarket

import android.app.ProgressDialog
import android.content.ContentValues
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import com.example.proyectomarket.model.Categoria
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.android.synthetic.main.activity_create_categoria.*



import java.util.regex.Pattern

class createCategoriaActivity : AppCompatActivity() {
    var patronc_codigo= Pattern.compile("CT[0-9]{3}")
    var patronc_nombre= Pattern.compile("[a-zA-Z ]{3,100}")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_categoria)
        title = "Crear Categoría"
    }

    fun CrearCategoria(v:View){
        var codigo = EDTCODIGOCATEGORIA_C.text.toString()
        var descripcion = EDTDESCRIPCIONCATEGORIA_C.text.toString()

        //VALIDACION CODIGO
        if(patronc_codigo.matcher(codigo).matches()==false){
            EDTCODIGOCATEGORIA_C.setError("Formato Incorrecto Inicia con CT y luego 3 números")
            return;
        }else
            EDTCODIGOCATEGORIA_C.setError(null);

        //VALIDACION DESCRIPCION
        if(patronc_nombre.matcher(descripcion).matches()==false){
            EDTDESCRIPCIONCATEGORIA_C.setError("Ingrese una descripcion, min 3 a max 100 caracteres")
            return;
        }else
            EDTDESCRIPCIONCATEGORIA_C.setError(null);

        var categoria = Categoria(codigo,descripcion,"")
        val db = FirebaseFirestore.getInstance()
        var progreso = ProgressDialog.show(this,
                "Grabando Datos","Espere un Momento ...", true)
        db.collection("CategoriaProductos").add(categoria).addOnSuccessListener{
            Toast.makeText(applicationContext, "Categoria ${categoria.Id} grabado OK", Toast.LENGTH_LONG).show()
            progreso.dismiss()
        }.addOnFailureListener { exception ->
            Log.d(ContentValues.TAG, "Codigo Ya Existe", exception)
            progreso.dismiss()

        }

    }

    fun listarCategorias(v: View){
        var intent:Intent = Intent(this,ListCategoriaActivity::class.java)
        startActivity(intent)
    }

    fun nuevoCategoria(v: View){
        EDTCODIGOCATEGORIA_C.setText("");
        EDTDESCRIPCIONCATEGORIA_C.setText("");
        Toast.makeText(applicationContext, "Nuevo", Toast.LENGTH_SHORT).show();
    }

    fun cerrarCategoria(v: View){
        finish();
    }

    fun BuscarCategoria(v:View){
        var intent:Intent = Intent(this,GetCategoriaActivity::class.java)
        startActivity(intent)
    }
}