import React, { useRef, useState, useEffect } from 'react';
import piedraImage from '/piedra.png'
import rocaImage from '/roca.png'
import oroImage from '/oro.png'
import esmeraldaImage from '/esmeralda.png'
import rubyImage from '/ruby.png'
import diamanteImage from '/diamante.png'
import './App.css'

function App() {
  const canvasRef = useRef(null);
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Cargar la imagen
    const img = new Image();
    switch(count){
      case 0:
        img.src = piedraImage
        break;
      case 100:
        img.src = rocaImage
        break;
      case 200:
        img.src = oroImage
        break;
      case 300:
        img.src = esmeraldaImage
        break;
      case 400:
        img.src = rubyImage
        break;
      case 500:
        img.src = diamanteImage
        break;
    }
    
    console.log(count);

    // Dibujar la imagen en el lienzo cuando esté cargada
    img.onload = () => {
      context.clearRect(0, 0, 350, 350);
      context.drawImage(img, -60, -60,350,350);
    };

    
  }, [count]);

  const handleClick = (event) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    

    // Obtener el color del píxel en las coordenadas del clic
    const imageData = context.getImageData(x, y, 1, 1).data;

    // Verificar si el componente alfa es diferente de cero (no transparente)
    if (imageData[3] !== 0) {
      canvas.classList.add('pulse');
      // Después de un tiempo corto, quitar la clase de pulso
      setTimeout(() => {
        canvas.classList.remove('pulse');
      }, 300);
      setCount(count + 1);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ userSelect: 'none' }}>Mineral Clicker</h1>
        <p style={{ userSelect: 'none' }}>Click count: {count}</p>
        <canvas
          ref={canvasRef}
          width={256}  // Ajusta el ancho del lienzo según tus necesidades
          height={256} // Ajusta la altura del lienzo según tus necesidades
          onClick={handleClick}
        />
      </header>
    </div>
  );
}

export default App

