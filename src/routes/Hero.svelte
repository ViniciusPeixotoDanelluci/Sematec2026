<script lang="ts">
    import { resolve } from '$app/paths'
    import type { Path } from '$app/types'
</script>

  <title>Básico</title>
  

    <header class="header">
         <h1>NDS (Nome Do Site)</h1>
    </header>

  <section class="hero-centralizar">
    <div class="hero-largura">
      
      <h1>Texto de exemplo BEEEEEEEEEEEEM GRANDE <br>fdss</h1> 
      <p style="margin: 15px 0;">Pode parecer besteira mas é assim pequenininho</p>
      
      <div class="hero-botao">
        <a href={resolve(('/alertas') as Path)} class="btn" style="background: white; color: black;">Alertas</a>
      </div>
      
    </div>
  </section>


 <style>
  
    .hero-centralizar {   
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh; 
      text-align: center; 

    }


    .hero-largura {
      max-width: 800px;
      width: 100%; 
      background: rgba(0, 0, 0, 1); 
      border: 1px solid rgba(255, 255, 255, 0.1); 
      border-radius: 24px; 
      padding: 40px; 
      color: white; 
    }

    .hero-botao {
      display: flex;
      justify-content: center;
      gap: 20px; 
      margin-top: 20px; 
    }

    .btn {
      padding: 10px 20px;
      border-radius: 20px; 
      text-decoration: none;
    }
  </style>