package com.example.proyectomarket

import android.app.ProgressDialog
import android.content.ContentValues
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import com.example.proyectomarket.model.Proveedor
import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.android.synthetic.main.activity_create_proveedor.*
import kotlinx.android.synthetic.main.activity_get_proveedor.*
import java.util.regex.Pattern

class GetProveedorActivity : AppCompatActivity() {
    var patronp_codigo= Pattern.compile("PV[0-9]{3}")
    var patronp_nombre= Pattern.compile("[a-zA-Z ]{3,100}")
    var patronp_descripcion= Pattern.compile("[0-9a-zA-Z ]{3,100}")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_get_proveedor)
        title = "Consultar/Actualizar Proveedor"
    }

    var uid:String = ""

    fun buscarProveedor(v:View) {
        val cod = EDTCODIGOPROVEEDOR_B.text.toString()
        val db = FirebaseFirestore.getInstance()
        val proveedor = db.collection("Proveedor").whereEqualTo("codigo", cod)
        //VALIDACION CODIGO
        if(patronp_codigo.matcher(cod).matches()==false){
            EDTCODIGOPROVEEDOR_B.setError("Formato Incorrecto Inicia con PV y luego 3 números")
            return;
        }else
            EDTCODIGOPROVEEDOR_B.setError(null);

        var progreso = ProgressDialog.show(this,
                "Buscando Datos","Espere un Momento ...", true)
        proveedor.get()
                .addOnSuccessListener { snapshot ->
                    if (snapshot != null && snapshot.documents.size != 0) {
                        val data = snapshot.documents[0]
                        uid = snapshot.documents[0].id
                        Log.d(ContentValues.TAG, "get failed with ${snapshot.documents[0]}")
                        escribirInputs(data)
                        progreso.dismiss()
                    } else {
                        Toast.makeText(applicationContext, "No se encontró el Proveedor: ${cod}", Toast.LENGTH_LONG).show()
                        limpiarInputs();
                        progreso.dismiss()
                    }
                }
                .addOnFailureListener { exception ->
                    Log.d(ContentValues.TAG, "get failed with ", exception)
                    progreso.dismiss()
                }
    }

    fun escribirInputs(data:DocumentSnapshot){
        EDTCODIGOPROVEEDOR_E.setText(data.get("codigo").toString())
        EDTDESCRIPCIONPROVEEDOR_E.setText(data.get("descripcion").toString())
        EDTNOMBREPROVEEDOR_E.setText(data.get("nombre").toString())
    }

    fun limpiarInputs(){
        EDTCODIGOPROVEEDOR_E.setText("")
        EDTDESCRIPCIONPROVEEDOR_E.setText("")
        EDTNOMBREPROVEEDOR_E.setText("")
    }

    fun actualizarProveedor(v:View){
        var codigo = EDTCODIGOPROVEEDOR_E.text.toString()
        var nombre = EDTNOMBREPROVEEDOR_E.text.toString()
        var descripcion = EDTDESCRIPCIONPROVEEDOR_E.text.toString()

        //VALIDACION NOMBRES
        if(patronp_nombre.matcher(nombre).matches()==false){
            EDTNOMBREPROVEEDOR_E.setError("Ingrese un nombre, min 3 a max 100 caracteres")
            return;
        }else
            EDTNOMBREPROVEEDOR_E.setError(null);
        //VALIDACION NOMBRES
        if(patronp_descripcion.matcher(descripcion).matches()==false){
            EDTDESCRIPCIONPROVEEDOR_E.setError("Ingrese una descripcion, min 3 a max 100 caracteres")
            return;
        }else
            EDTDESCRIPCIONPROVEEDOR_E.setError(null);

        var proveedor = Proveedor(codigo,nombre,descripcion,uid)
        val db = FirebaseFirestore.getInstance()
        var progreso = ProgressDialog.show(this,
                "Listando Datos","Espere un Momento ...", true)
        db.collection("Proveedor").document(uid).set(proveedor).addOnSuccessListener{
            Toast.makeText(applicationContext, "Proveedor ${proveedor.codigo.toString()} actualizado OK", Toast.LENGTH_LONG).show()
            progreso.dismiss()
        }.addOnFailureListener { exception ->
            Log.d(ContentValues.TAG, "Codigo Ya Existe", exception) }
        progreso.dismiss()
    }
}