USE concesionario;
   SHOW TABLES;

 
 ALTER TABLE clientes (
ADD COLUMN lastname VARCHAR(100),
ADD COLUMN age INT,
ADD COLUMN password VARCHAR(255);
);

CREATE TABLE autos (
    id_auto INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(100),
    modelo VARCHAR(100),
    precio DECIMAL(10,2)
);

CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_auto INT,
    fecha DATE,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_auto) REFERENCES autos(id_auto)
);

CREATE TABLE financiamiento (
    id_financiamiento INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT,
    cuotas INT,
    interes DECIMAL(5,2),
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta)
);/GIT PUSH ADD