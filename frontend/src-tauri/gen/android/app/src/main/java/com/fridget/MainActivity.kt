package com.fridget

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import android.view.View
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat

class MainActivity : TauriActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    enableEdgeToEdge()
    super.onCreate(savedInstanceState)

    createInsets(findViewById<View>(android.R.id.content).rootView)
  }

  fun createInsets(view: View?) {
    if (view == null) return

    ViewCompat.setOnApplyWindowInsetsListener(view) { v, windowInsets ->
      val imeVisible = windowInsets.isVisible(WindowInsetsCompat.Type.ime())
      val bottomInsets =
        if (imeVisible) {
          windowInsets.getInsets(WindowInsetsCompat.Type.ime()).bottom
        } else {
          windowInsets.getInsets(WindowInsetsCompat.Type.systemBars()).bottom
        }

      v.setPadding(0, 0, 0, bottomInsets)

      windowInsets
    }
  }
}
