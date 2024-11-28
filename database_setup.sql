-- Crear base de datos
CREATE DATABASE campus_cafe;

USE campus_cafe;

-- Tabla User
CREATE TABLE User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role INT NOT NULL,
    alias VARCHAR(255),
    profilepic VARCHAR(255),
    address VARCHAR(255)
);

-- Tabla Cafe
CREATE TABLE Cafe (
    CafeID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    location VARCHAR(255),
    rating FLOAT,
    hours VARCHAR(255),
    image VARCHAR(255)
);

-- Tabla MenuItem
CREATE TABLE MenuItem (
    MenuItemID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    category VARCHAR(255),
    image VARCHAR(255),
    availability BOOLEAN,
    CafeID INT,
    FOREIGN KEY (CafeID) REFERENCES Cafe(CafeID)
);


-- Tabla Order
CREATE TABLE `Order` (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    totalAmount DECIMAL(10, 2),
    status VARCHAR(50),
    orderTime DATETIME,
    pickupTime DATETIME,
    confirmationCode VARCHAR(50) NOT NULL,
    UserID INT,
    CafeID INT,
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (CafeID) REFERENCES Cafe(CafeID)
);

-- Tabla OrderItem
CREATE TABLE OrderItem (
    OrderItemID INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT,
    price DECIMAL(10, 2),
    OrderItemID INT,
    MenuItemID INT,
    FOREIGN KEY (OrderItemID) REFERENCES OrderItem(OrderItemID)
    FOREIGN KEY (MenuItemID) REFERENCES MenuItem(MenuItemID)
);

-- Tabla Review
CREATE TABLE Review (
    ReviewID INT AUTO_INCREMENT PRIMARY KEY,
    rating INT,
    title VARCHAR(255),
    comment TEXT,
    date DATETIME,
    UserID INT,
    CafeID INT,
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (CafeID) REFERENCES Cafe(CafeID)
);

-- Tabla ReviewFile
CREATE TABLE ReviewFile (
    ReviewFileID INT AUTO_INCREMENT PRIMARY KEY,
    reviewimg VARCHAR(255),
    ReviewID INT,
    FOREIGN KEY (ReviewID) REFERENCES Review(ReviewID)
);
--------------------------------------------------
INSERT INTO User (name, lastname, email, password, phone, role, alias, profilepic, address)
VALUES (
    'Admin',                     -- Nombre
    'User',                      -- Apellido
    'admin@campuscafe.com',      -- Email
    'securepassword',            -- Contraseña (reemplázala con una segura o encriptada)
    '1234567890',                -- Teléfono
    1,                           -- Rol (1 para administrador)
    'Administrator',             -- Alias
    'C:\Users\melis\Desktop\API\cup.jpg',                        -- Imagen de perfil (puedes dejarlo NULL si no tienes imagen por defecto)
    '123 Admin Street'           -- Dirección
);