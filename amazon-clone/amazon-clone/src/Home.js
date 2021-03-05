import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
    return (
        <div className='home'>
            
            <div className='home__container'>
                <img className='home__image' src='https://images-na.ssl-images-amazon.com/images/G/01/kindle/journeys/OWIxZDAxNjkt/OWIxZDAxNjkt-NDE3OTM4NTgt-w1500._CB658881205_.jpg' alt="" />

                <div className='home__row'>
                    <Product 
                        title='The Lean Startup: How Constant Innovation Creates Radically Successful Businesses' 
                        price={29.99} 
                        image='https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg' 
                        rating={5} 
                    />
                    <Product 
                        title='Vornado VFAN Jr. Vintage Air Circulator Fan'
                        price={59.99}
                        image='https://images-na.ssl-images-amazon.com/images/I/91oIxWCtD2L._AC_SL1500_.jpg'
                        rating={5}
                    />
                </div>
                
                <div className='home__row'>
                    <Product 
                        title='Gourmet Basics by Mikasa Madam Metal Stacking/Nesting Rectangular Basket with Acacia Lid, Antique Black
                        '
                        price={34.99}
                        image='https://images-na.ssl-images-amazon.com/images/I/81571NcbwGL._AC_SL1500_.jpg'
                        rating={4}
                    />
                    <Product 
                        title='Simple Houseware Heavy Duty 3-Bag Laundry Sorter Rolling Cart, Brown'
                        price={30.87}
                        image='https://images-na.ssl-images-amazon.com/images/I/91fgiNfIqiL._AC_SL1500_.jpg'
                        rating={5}
                    />
                    <Product 
                        title='
                        Instant Pot Duo 7-in-1, 6 Quart, 14 One-Touch Programs'
                        price={79.99}
                        image='https://images-na.ssl-images-amazon.com/images/I/61XkZDJ6ilL._AC_SL1500_.jpg'
                        rating={5}
                    />
                </div>
                
                <div className='home__row'>
                    <Product 
                        title='LG 29WN600-W 29" 21:9 UltraWide WFHD IPS HDR10 Monitor with FreeSync, Silver'
                        price={225.77}
                        image='https://images-na.ssl-images-amazon.com/images/I/91WlgTJfawL._AC_SL1500_.jpg'
                        rating={5}
                    />
                </div>



            </div>
        </div>
    )
}

export default Home
