package com.example.proyectomarket

import android.app.ProgressDialog
import android.content.ContentValues
import android.os.Bundle
import android.util.Log
import android.widget.ArrayAdapter
import androidx.appcompat.app.AppCompatActivity
import com.example.proyectomarket.model.Product
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.android.synthetic.main.activity_list_productos.*

class ListProductosActivity : AppCompatActivity() {

    val listaProducto=ArrayList<Product>();
    val arrayAdapterProducto = null;

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_list_productos)
        title = "Lista Productos"

        listaProducto();
    }


    fun listaProducto() {
        val db = FirebaseFirestore.getInstance()
        val productos = db.collection("Productos")
        var lista = ArrayList<Product>();

        var progreso = ProgressDialog.show(this,
                "Listando Datos","Espere un Momento ...", true)
        productos.get()

                .addOnSuccessListener { document ->
                    if (document != null) {

                        val list = document.documents;
                        for (i in list) run {
                            var cad: Product
                            cad = Product(i.get("Codigo").toString(), i.get("Descripcion").toString(),
                                    i.get("Estado").toString(), i.get("Nombre").toString(), i.get("Precio").toString(),
                                    i.get("Stock").toString(), i.get("cod_catg").toString(), i.get("cod_prov").toString(),
                                    i.get("uid").toString()
                            )
                            Log.d(ContentValues.TAG, "Document cont : ${i.get("Nombre")}")
                            lista.add(cad);
                            progreso.dismiss()
                        }
                        mostrarProducto(lista);
                        progreso.dismiss()
                    } else {
                        Log.d(ContentValues.TAG, "No such document")
                        progreso.dismiss()
                    }
                }
                .addOnFailureListener { exception ->
                    Log.d(ContentValues.TAG, "get failed with ", exception)
                    progreso.dismiss()
                }
    }

    fun mostrarProducto(cadena:ArrayList<Product>)
    {
        try {
            var lista=ArrayList<String>()
            var cad="";
            var json = cadena;
            var Contador:Int = json.size - 1;

            for (i in 0..Contador )
            {
                cad = json[i].Codigo + "\n" +
                        json[i].Nombre + "\n" +
                        json[i].Descripcion + "\n"
                lista.add(cad);
            }

            var adaptador = ArrayAdapter<String>(
                    this,
                    android.R.layout.simple_list_item_1,
                    lista
            )

            lvProducto.adapter = adaptador
        }catch (ex:Exception){
            Log.e("error", ex.message.toString())
        }

    }

}