package com.example.proyectomarket

import android.app.ProgressDialog
import android.content.ContentValues
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import com.example.proyectomarket.model.Categoria
import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.android.synthetic.main.activity_get_categoria.*
import java.util.regex.Pattern

class GetCategoriaActivity : AppCompatActivity() {
    var patronc_codigo= Pattern.compile("CT[0-9]{3}")
    var patronc_nombre= Pattern.compile("[a-zA-Z ]{3,100}")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_get_categoria)
        title = "Consultar/Actualizar Categoria"
    }

    var uid:String = ""

    fun buscarCategoria(v:View) {
        val cod = EDTCODIGOCATEG_B.text.toString()
        val db = FirebaseFirestore.getInstance()
        val categoria = db.collection("CategoriaProductos").whereEqualTo("Id", cod)
        //VALIDACION CODIGO
        if(patronc_codigo.matcher(cod).matches()==false){
            EDTCODIGOCATEG_B.setError("Formato Incorrecto Inicia con CT y luego 3 números")
            return;
        }else
            EDTCODIGOCATEG_B.setError(null);
        var progreso = ProgressDialog.show(this,
                "Buscando Datos","Espere un Momento ...", true)
        categoria.get()
                .addOnSuccessListener { snapshot ->
                    if (snapshot != null && snapshot.documents.size !== 0) {
                        val data = snapshot.documents[0]
                        escribirInputs(data)
                        progreso.dismiss()
                    } else {
                        Toast.makeText(applicationContext, "No se encontró el Producto ${cod}", Toast.LENGTH_LONG).show()
                        limpiarInputs()
                        progreso.dismiss()
                    }
                }
                .addOnFailureListener { exception ->
                    Log.d(ContentValues.TAG, "get failed with ", exception)
                    progreso.dismiss()
                }
    }

    fun escribirInputs(data:DocumentSnapshot){
        ETCODIGOCATEG_E.setText(data.get("Id").toString())
        ETDESCCATEG_E.setText(data.get("descripcion").toString())
        uid = data.id
    }

    fun limpiarInputs(){
        ETCODIGOCATEG_E.setText("")
        ETDESCCATEG_E.setText("")
        uid = ""
    }

    fun ActualizarProducto(v:View){
        var codigo = ETCODIGOCATEG_E.text.toString()
        var descripcion = ETDESCCATEG_E.text.toString()
        //VALIDACION NOMBRES
        if(patronc_nombre.matcher(descripcion).matches()==false){
            ETDESCCATEG_E.setError("Ingrese una descripcion, min 3 a max 100 caracteres")
            return;
        }else
            ETDESCCATEG_E.setError(null);
        var categoria = Categoria(codigo,descripcion,uid)
        val db = FirebaseFirestore.getInstance()
        var progreso = ProgressDialog.show(this,
                "Listando Datos","Espere un Momento ...", true)
        db.collection("CategoriaProductos").document(uid).set(categoria).addOnSuccessListener {
            Toast.makeText(applicationContext, "Categoria ${codigo} Actualizada OK", Toast.LENGTH_LONG).show()
            progreso.dismiss()
        }.addOnFailureListener { exception ->
            Log.d(ContentValues.TAG, "Codigo Ya Existe", exception) }
        progreso.dismiss()
    }
}