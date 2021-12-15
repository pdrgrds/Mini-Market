package com.example.proyectomarket

import android.app.ProgressDialog
import android.content.ContentValues
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import com.example.proyectomarket.model.Proveedor
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.android.synthetic.main.activity_create_proveedor.*
import java.util.regex.Pattern

class createProveedorActivity : AppCompatActivity() {
    var patronp_codigo= Pattern.compile("PV[0-9]{3}")
    var patronp_nombre= Pattern.compile("[a-zA-Z ]{3,100}")
    var patronp_descripcion= Pattern.compile("[0-9a-zA-Z ]{3,100}")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_proveedor)
        title = "Crear Proveedor"
    }

    fun CrearProveedor(v:View){
        var codigo = EDTCODIGOPROVEEDOR_C.text.toString()
        var nombre = EDTNOMBREPROVEEDOR_C.text.toString()
        var descripcion = EDTDESCRIPCIONPROVEEDOR_C.text.toString()

        //VALIDACION CODIGO
        if(patronp_codigo.matcher(codigo).matches()==false){
            EDTCODIGOPROVEEDOR_C.setError("Formato Incorrecto Inicia con PV y luego 3 números")
            return;
        }else
            EDTCODIGOPROVEEDOR_C.setError(null);

        //VALIDACION NOMBRE
        if(patronp_nombre.matcher(nombre).matches()==false){
            EDTNOMBREPROVEEDOR_C.setError("Ingrese un nombre, min 3 a max 100 caracteres")
            return;
        }else
            EDTNOMBREPROVEEDOR_C.setError(null);

        //VALIDACION DESCRIPCION
        if(patronp_descripcion.matcher(descripcion).matches()==false){
            EDTDESCRIPCIONPROVEEDOR_C.setError("Ingrese una descripcion, min 3 a max 100 caracteres")
            return;
        }else
            EDTDESCRIPCIONPROVEEDOR_C.setError(null);

        var proveedor = Proveedor(codigo,nombre,descripcion,"")
        val db = FirebaseFirestore.getInstance()
        var progreso = ProgressDialog.show(this,
                "Grabando Datos","Espere un Momento ...", true)
        db.collection("Proveedor").add(proveedor).addOnSuccessListener{
            Toast.makeText(applicationContext, "Proveedor ${proveedor.codigo.toString()} grabado OK", Toast.LENGTH_LONG).show()
            progreso.dismiss()
        }.addOnFailureListener { exception ->
            Log.d(ContentValues.TAG, "Codigo Ya Existe", exception)
            progreso.dismiss()

        }
    }

    fun listarProveedores(v: View) {
        var intent:Intent = Intent(this,ListProveedorActivity::class.java)
        startActivity(intent)
    }

    fun nuevoProveedor(v: View){
        EDTCODIGOPROVEEDOR_C.setText("");
        EDTNOMBREPROVEEDOR_C.setText("");
        EDTDESCRIPCIONPROVEEDOR_C.setText("");
        Toast.makeText(applicationContext, "Nuevo", Toast.LENGTH_SHORT).show();

    }

    fun cerrarProveedor(v: View){
        finish();
    }

    fun BuscarProveedor(v:View) {
        var intent:Intent = Intent(this, GetProveedorActivity::class.java)
        startActivity(intent)

    }
}