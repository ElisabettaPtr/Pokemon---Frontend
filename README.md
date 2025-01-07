# How to start Project
- ### After cloning repository run:
    - cd pokemon-front-end
    - npm install
    - npm run dev 

- ### Navigate to "/homepage" or directly to "/login"

- ### Login:
    - Username: trainer1
    - Password: password

# Project POKÉDEX

## Goals: 
- Exploring Database
- Manage personal collection

## Pagine:
- Homepage
- Login
- Register
- Pokémon DB
- MyPokédex
- Wishlist
- Pokémon info
- Personal profile

## Navbar 
Navigation Menu:
- 'Pokémon' = redirect "/"
- 'Pokédex' = redirect "/my-pokedex"
- 'Wishlist' = redirect "/my-wishlist"

Account icon:
- Profile = redirect "/profile"
- Logout = removes token and redirect to "/login"

![LAYOUT](\immagini_markdown\layout.png)

## Pokémon DB

### Pokécards:
- Card onClick: redirect to Pokémon Detail

### Card Actions:
- Add to pokédex ('+ icon')
- Add to wishlist ('heart icon')

![POKÉMONDB](\immagini_markdown\pokémon_db.png)

## MyPokédex

### Pokécards:
- Card onClick: redirect to Pokémon Detail

### Card Actions:
- Remove from pokédex ('trash icon')
- Move to wishlist ('arrow icon')

![MYPOKÉDEX](\immagini_markdown\my_pokédex.png)

## MyWishlist

### Pokécards:
- Card onClick: redirect to Pokémon Detail

### Card Actions:
- Remove from wishlist ('trash icon')
- Move to pokédex ('arrow icon')

![WISHLIST](\immagini_markdown\wishlist.png)

## Pokémon info
![POKÉMONINFO](\immagini_markdown\pokémon_info.png)

## User Info
![USERINFO](\immagini_markdown\profile.png)

## REACT 
- JavaScript library for building user interfaces

# CSS
- [tailwindcss.com](https://tailwindcss.com)
- [daisyui.com](https://daisyui.com)

### FONT
- [cdnfonts.com](https://www.cdnfonts.com)

### ICONE
- [lucide.dev](https://lucide.dev)

### ALERT
- [sweetalert2.github.io ](https://sweetalert2.github.io)


# Project explanation

### App.tsx: routing

ex. <Route path="/" element={</>}></Route>

### Components:
- Reusable 
- Contained in "Pages"

### Pages
- Structured using components

### Layout
- Contains Navbar and Outlet (contents of Outlet change based on routing)


#### NICE TO HAVE

- Update User
- Searchbar