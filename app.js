document.addEventListener('DOMContentLoaded', () => {
    // Referencias al DOM
    const btnLoad = document.getElementById('btnLoad');
    const btnClear = document.getElementById('btnClear');
    const searchInput = document.getElementById('searchInput');
    const dashboard = document.getElementById('dashboard');
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('errorMessage');
    const statusMessage = document.getElementById('statusMessage');

    const API_USERS = 'https://jsonplaceholder.typicode.com/users';
    const API_POSTS = 'https://jsonplaceholder.typicode.com/posts';

    // 1. PETICIÓN ANIDADA (Debe declararse antes para evitar errores)
    const fetchPublicaciones = async (e) => {
        const userId = e.target.getAttribute('data-id');
        const postsContainer = document.getElementById(`posts-${userId}`);

        // Alternar visibilidad si ya se cargaron los posts
        if (postsContainer.innerHTML !== '') {
            postsContainer.style.display = postsContainer.style.display === 'none' ? 'block' : 'none';
            return;
        }

        try {
            postsContainer.style.display = 'block';
            postsContainer.innerHTML = '<p>⏳ Cargando publicaciones...</p>';

            const response = await fetch(`${API_POSTS}?userId=${userId}`);
            if (!response.ok) throw new Error('Error al cargar posts');

            const posts = await response.json();
            
            // Renderizar solo los primeros 2 posts
            postsContainer.innerHTML = posts.slice(0, 2).map(post => `
                <div class="post-item">
                    <h4>${post.title}</h4>
                    <p>${post.body}</p>
                </div>
            `).join('');

        } catch (error) {
            postsContainer.innerHTML = `<p style="color: red;">Error: Failed to fetch</p>`;
        }
    };

    // 2. RENDERIZAR USUARIOS EN EL DOM
    const renderizarUsuarios = (usuarios) => {
        usuarios.forEach(usuario => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3 class="user-name">${usuario.name}</h3>
                <p><strong>Email:</strong> ${usuario.email}</p>
                <p><strong>Sitio web:</strong> ${usuario.website}</p>
                <button class="btn-posts" data-id="${usuario.id}">Ver publicaciones</button>
                <div class="posts-container" id="posts-${usuario.id}" style="display: none;"></div>
            `;
            dashboard.appendChild(card);
        });

        // Asignar evento a los botones de publicaciones
        document.querySelectorAll('.btn-posts').forEach(btn => {
            btn.addEventListener('click', fetchPublicaciones);
        });
    };

    // 3. CARGAR DATOS (Fetch API con async/await y manejo de ERRORES)
    const fetchUsuarios = async () => {
        // Estado de carga inicial
        loader.style.display = 'block';
        errorMessage.style.display = 'none';
        dashboard.innerHTML = '';
        statusMessage.textContent = 'Solicitando datos...';
        statusMessage.className = 'status-message';

        // TRUCO PARA TU CAPTURA: Si escribes "error" en el buscador, rompe la URL a propósito
        let urlFetch = API_USERS;
        if (searchInput.value.toLowerCase() === 'error') {
            urlFetch = 'https://url-falsa-para-provocar-error.com/users';
        }

        try {
            const response = await fetch(urlFetch);
            
            // Si la respuesta no es 200 OK, lanzamos el error
            if (!response.ok) throw new Error('Failed to fetch');

            const usuarios = await response.json();
            renderizarUsuarios(usuarios);

            // Mensaje de éxito
            statusMessage.textContent = `${usuarios.length} registros cargados`;
            statusMessage.className = 'status-message status-success';

        } catch (error) {
            // MANEJO DE ERROR: Aquí se despliega el contenedor rojo
            errorMessage.textContent = 'Error: Failed to fetch';
            errorMessage.style.display = 'block';
            statusMessage.textContent = 'Error en la carga';
        } finally {
            // Finalizar estado de carga (ocultar spinner)
            loader.style.display = 'none';
        }
    };

    // 4. LIMPIAR INTERFAZ
    btnClear.addEventListener('click', () => {
        dashboard.innerHTML = '';
        searchInput.value = '';
        errorMessage.style.display = 'none';
        statusMessage.textContent = 'Dashboard limpio';
        statusMessage.className = 'status-message';
    });

    // 5. FILTRO DE BÚSQUEDA EN TIEMPO REAL
    searchInput.addEventListener('input', (e) => {
        const textoBusqueda = e.target.value.toLowerCase();
        const tarjetas = document.querySelectorAll('.card');

        tarjetas.forEach(tarjeta => {
            const nombre = tarjeta.querySelector('.user-name').textContent.toLowerCase();
            if (nombre.includes(textoBusqueda)) {
                tarjeta.style.display = 'block';
            } else {
                tarjeta.style.display = 'none';
            }
        });
    });

    // Asignar evento al botón principal de carga
    btnLoad.addEventListener('click', fetchUsuarios);
});