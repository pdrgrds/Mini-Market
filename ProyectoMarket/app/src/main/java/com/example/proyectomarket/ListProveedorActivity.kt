package com.example.proyectomarket

import android.app.ProgressDialog
import android.content.ContentValues
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.ArrayAdapter
import com.example.proyectomarket.model.Proveedor
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.android.synthetic.main.activity_list_proveedor.*


class ListProveedorActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_list_proveedor)
        title = "Lista Proveedores"
        listaProveedor();
    }

    fun listaProveedor(){
        val db = FirebaseFirestore.getInstance()
        val proveedor = db.collection("Proveedor")
        var lista = ArrayList<Proveedor>();
        var progreso = ProgressDialog.show(this,
                "Listando Datos","Espere un Momento ...", true)
        proveedor.get()
                .addOnSuccessListener { document ->
                    if (document != null) {

                        val list = document.documents;
                        for (i in list) run {
                            var cad: Proveedor
                            cad = Proveedor(i.get("codigo").toString(), i.get("descripcion").toString(), i.get("nombre").toString(), i.get("uid").toString())
                            lista.add(cad);
                            progreso.dismiss()
                        }
                        mostrarProveedor(lista);
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

    fun mostrarProveedor(cadena:ArrayList<Proveedor>)
    {
        try {
            var lista=ArrayList<String>()
            var cad="";
            var json = cadena;
            var Contador:Int = json.size - 1;

            for (i in 0..Contador )
            {
                cad = json[i].codigo + "\n" +
                        json[i].nombre + "\n" +
                        json[i].descripcion + "\n"
                lista.add(cad);
            }

            var adaptador = ArrayAdapter<String>(
                    this,
                    android.R.layout.simple_list_item_1,
                    lista
            )

            lvProveedor.adapter = adaptador
        }catch (ex:Exception){
            Log.e("error", ex.message.toString())
        }

    }
}