// Arreglo inicial de productos con un producto de ejemplo
let products = [
    {
        id: 1,
        name: "Laptop Gaming",
        price: 1299.99,
        description: "Potente laptop para gaming con procesador Intel i7 y tarjeta gráfica RTX 3060."
    }
];

// Función que recibe un producto y devuelve el HTML para mostrarlo en la lista
function renderProduct(product) {
    return `
        <li class="product-item" data-id="${product.id}">
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-description">${product.description}</div>
        </li>
    `;
}

// Función que actualiza el listado completo de productos en el DOM
function renderProductList() {
    const productListElement = document.getElementById('productList'); // Contenedor de productos
    const productCountElement = document.getElementById('productCount'); // Contador de productos
    
    productListElement.innerHTML = ''; // Limpiar listado previo
    
    // Renderizar cada producto y añadirlo al contenedor
    products.forEach(product => {
        productListElement.innerHTML += renderProduct(product);
    });
    
    // Mostrar el número total de productos disponibles
    productCountElement.textContent = `Total de productos: ${products.length}`;
}

// Función para agregar un nuevo producto al arreglo y actualizar la vista
function addProduct(name, price, description) {
    // Generar un ID único basado en el máximo actual + 1
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    // Crear el objeto producto con sus propiedades
    const newProduct = {
        id: newId,
        name: name,
        price: parseFloat(price),
        description: description
    };
    
    products.push(newProduct); // Añadir producto al arreglo
    
    renderProductList(); // Actualizar la lista de productos
    
    // Animación visual para destacar el nuevo producto agregado
    setTimeout(() => {
        const newProductElement = document.querySelector(`[data-id="${newId}"]`);
        if (newProductElement) {
            newProductElement.style.backgroundColor = '#d4edda'; // Fondo verde claro
            newProductElement.style.border = '2px solid #28a745'; // Borde verde
            
            // Después de 2 segundos, restaurar estilo original con un borde azul lateral
            setTimeout(() => {
                newProductElement.style.backgroundColor = '#f8f9fa';
                newProductElement.style.border = 'none';
                newProductElement.style.borderLeft = '4px solid #007bff';
            }, 2000);
        }
    }, 100);
}

// Función que maneja el evento submit del formulario para agregar productos
function handleFormSubmit(event) {
    event.preventDefault(); // Evitar que la página se recargue
    
    // Obtener valores ingresados por el usuario y limpiar espacios extra
    const name = document.getElementById('productName').value.trim();
    const price = document.getElementById('productPrice').value;
    const description = document.getElementById('productDescription').value.trim();
    
    // Validar que no falte ningún campo
    if (!name || !price || !description) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    
    // Validar que el precio sea un número mayor a 0
    if (parseFloat(price) <= 0) {
        alert('El precio debe ser mayor a 0.');
        return;
    }
    
    // Agregar producto usando la función definida antes
    addProduct(name, price, description);
    
    // Limpiar formulario para nuevo ingreso
    document.getElementById('productForm').reset();
    
    // Mostrar mensaje visual de éxito
    showSuccessMessage();
}

// Función para mostrar un mensaje temporal de éxito en pantalla
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 20px;">✅</span>
            <span>¡Producto agregado exitosamente!</span>
        </div>
    `;
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #28a745, #20c997);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        font-weight: bold;
        animation: slideIn 0.3s ease;
    `;
    
    // Agregar animación CSS para el mensaje (si no existe ya)
    if (!document.querySelector('#successAnimation')) {
        const style = document.createElement('style');
        style.id = 'successAnimation';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(successMessage); // Mostrar mensaje
    
    // Quitar mensaje después de 3 segundos con animación inversa
    setTimeout(() => {
        successMessage.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            if (document.body.contains(successMessage)) {
                document.body.removeChild(successMessage);
            }
        }, 300);
    }, 3000);
}

// Función para inicializar la aplicación al cargar la página
function initApp() {
    renderProductList(); // Mostrar productos iniciales
    
    // Configurar evento para el formulario
    const productForm = document.getElementById('productForm');
    productForm.addEventListener('submit', handleFormSubmit);
    
    // Configurar características adicionales para mejorar UX
    setupAdditionalFeatures();
}

// Función para agregar mejoras extra a la interfaz y formulario
function setupAdditionalFeatures() {
    const firstInput = document.getElementById('productName');
    
    // Mostrar mensaje de bienvenida con animación
    setTimeout(() => {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 20px;">👋</span>
                <span>¡Bienvenido! Prueba agregando tu propio producto usando el formulario de abajo.</span>
            </div>
        `;
        welcomeMessage.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            right: 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            font-weight: bold;
            text-align: center;
            animation: slideDown 0.5s ease;
        `;
        
        if (!document.querySelector('#welcomeAnimation')) {
            const style = document.createElement('style');
            style.id = 'welcomeAnimation';
            style.textContent = `
                @keyframes slideDown {
                    from {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(welcomeMessage);
        
        // Eliminar mensaje después de 5 segundos con animación inversa
        setTimeout(() => {
            welcomeMessage.style.animation = 'slideDown 0.5s ease reverse';
            setTimeout(() => {
                if (document.body.contains(welcomeMessage)) {
                    document.body.removeChild(welcomeMessage);
                }
            }, 500);
        }, 5000);
    }, 1000);
    
    // Validar y dar feedback visual mientras se escribe el precio
    const priceInput = document.getElementById('productPrice');
    priceInput.addEventListener('input', function() {
        if (this.value) {
            const value = parseFloat(this.value);
            if (!isNaN(value) && value > 0) {
                this.style.borderColor = '#28a745';
                this.style.background = 'rgba(40,167,69,0.1)';
            } else {
                this.style.borderColor = '#dc3545';
                this.style.background = 'rgba(220,53,69,0.1)';
            }
        } else {
            this.style.borderColor = 'transparent';
            this.style.background = 'rgba(255,255,255,0.95)';
        }
    });
    
    // Contador visual para limitar caracteres en descripción
    const descriptionInput = document.getElementById('productDescription');
    const maxChars = 200;
    const charCounter = document.createElement('div');
    charCounter.style.cssText = `
        font-size: 13px;
        color: rgba(255,255,255,0.8);
        text-align: right;
        margin-top: 5px;
        font-weight: bold;
    `;
    descriptionInput.parentNode.appendChild(charCounter);
    
    descriptionInput.addEventListener('input', function() {
        const remaining = maxChars - this.value.length;
        charCounter.textContent = `${remaining} caracteres restantes`;
        
        if (remaining < 0) {
            charCounter.style.color = '#ffebee';
            this.style.borderColor = '#dc3545';
            this.style.background = 'rgba(220,53,69,0.1)';
        } else if (remaining < 20) {
            charCounter.style.color = '#fff8e1';
            this.style.borderColor = '#ffc107';
            this.style.background = 'rgba(255,193,7,0.1)';
        } else {
            charCounter.style.color = 'rgba(255,255,255,0.8)';
            this.style.borderColor = 'transparent';
            this.style.background = 'rgba(255,255,255,0.95)';
        }
    });
    
    // Ejecutar una vez para mostrar el contador desde el inicio
    descriptionInput.dispatchEvent(new Event('input'));
}

// Ejecutar la inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);

// Funciones para debugging y pruebas manuales desde consola
window.getProducts = () => products; // Obtener arreglo actual
window.clearProducts = () => {
    products = [];
    renderProductList();
};
window.addSampleProducts = () => {
    const sampleProducts = [
        { name: "Monitor 4K", price: 299.99, description: "Monitor ultra HD de 27 pulgadas ideal para trabajo y entretenimiento." },
        { name: "Teclado Mecánico", price: 129.50, description: "Teclado gaming con switches mecánicos y retroiluminación RGB." },
        { name: "Mouse Inalámbrico", price: 79.99, description: "Mouse ergonómico con sensor óptico de alta precisión." }
    ];
    
    sampleProducts.forEach(product => {
        addProduct(product.name, product.price, product.description);
    });
};
