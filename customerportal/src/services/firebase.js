import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
          apiKey: "AIzaSyCB-DxYX1ZCUuupCTWGo7vXSCbP4OkGWBA",
          authDomain: "digital-hippo-49186.firebaseapp.com",
          projectId: "digital-hippo-49186",
          storageBucket: "digital-hippo-49186.firebasestorage.app",
          messagingSenderId: "1092483916399",
          appId: "1:1092483916399:web:10e4a9d2de4d8fed9de39a",
          measurementId: "G-Q1CZR51BBQ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export const seedDatabase = async () => {
          try {
                    const productsRef = collection(db, "products");
                    const snapshot = await getDocs(productsRef);

                    // Agar DB pehle se seeded hai tou skip kardo
                    if (!snapshot.empty) {
                              console.log("Database pehle se ready hai!");
                              return;
                    }

                    // 1. Seed Products
                    const initialProducts = [
                              {
                                        name: "Linen Essence Shirt",
                                        price: 195,
                                        description: "Crafted for the modern minimalist, this piece celebrates the quiet strength of refined tailoring and the raw, honest beauty of pure Italian linen.",
                                        image: "https://lh3.googleusercontent.com/aida/ADBb0uhxHgnP33gOJS0mfUukubG7RmvrgL5OZ0y3B9wfedm6WmIMcBiRJNOiSoIRsd8D7QFK2mGYlnH5dJGXegUjmbSbVe3jOG_eQ065HVNIWesItmMrAch4qIdAhlYklqIBK8L7syPva07JNrG0z7U4-juElp9AOF8pn4kZrgMJlNsDDy-rteQX9JFuZmdkBGcLxS0fZgIW4oyRgH1ZxJ6bAhDmNoTkKC_Esc1f6HbCQWaTANzcuWt2xutvYIR_",
                                        category: "tops",
                                        sizes: ["XS", "S", "M", "L"],
                                        colors: ["Oyster White"]
                              },
                              {
                                        name: "The Ethereal Slip",
                                        price: 340,
                                        description: "A high-end silk slip dress in a soft ivory shade, designed for effortless elegance.",
                                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBql05PB0_OR7eo6O_yRngExvVbgwuMsQ2nFFXwI6adTi9O172Ln2UNe3pW40gEbbAi_2vKaL_mi560_0cQjJN435v-l9wHkzcSaCKiYO60gulQlEANL4KF3tHdvOxlbu4QqiJz6KEWbuQMZll0W9zjdV8WDcYYD4sLJKe-nh9T2TATG32Apu5cQN6AWbUmdzpfZ0alWJaMk-pE009kVqjGmQ0nVaTvAOKiXwpgE9MshGjZgK0P-ldiackFKDQ5APclArFvuy1r0Fjv",
                                        category: "dresses",
                                        sizes: ["S", "M", "L"],
                                        colors: ["Champagne"]
                              },
                              {
                                        name: "Oversized Cashmere",
                                        price: 420,
                                        description: "Oversized cashmere sweater in a warm oatmeal color, offering a sense of effortless grace and luxury.",
                                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_bdj_vXWmTxnX4XwnnpKBqPTee9Ttwjk2KjqliTGaErvMLoB2OEPTV4SIvB-h4r0WU9_QJMlNdO8Ehoh5hUB3Z6ZPOtEbnRmXSD8b88l4ybvJ8yj8i04xDH-lxPOW2ilDiqWBXExkIKMw5fhq8iJOWYSeHLl0BFA6TdyZPNI9Du9Wc0orXHjudhWKGTxOjuAZjviukhNbzA7LqyAGhDD7VPLb37iCJGydpUqQj8plCu3zuCevhOKcM0PyS0GJCQkRWUO2UWrpj1Rk",
                                        category: "knitwear",
                                        sizes: ["M", "L"],
                                        colors: ["Oatmeal"]
                              },
                              {
                                        name: "The Fluid Trouser",
                                        price: 280,
                                        description: "Wide-leg silk trousers in a deep charcoal color, displaying the fluid drape of the fabric.",
                                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqpJAfiykhmaNf7t1Pj4jI7Jb9WlT6G_cvtr9KsUW4pjchzDu9cn9c_Zg4x7tlTd2vFmntsw_iqEh13h9lyZcZ1YQdOKW90ZfHHvHoh6JA7oABEFCVGwdEoxSc3qZ56ARRrrnWpth1TwA3mlldCRv62tgeiZeUIlOBn0Wfr05UBbpgQDrJjKyqCotSTaHv8iky5uQckt0tZxQhOrzo_4_TWvLxxzNq3O-6MQ3ZqdP6KZTUaUoKdNgmL_4TPoLl0qn1PWSeKvZ9kyBd",
                                        category: "trousers",
                                        sizes: ["S", "M", "L"],
                                        colors: ["Charcoal"]
                              }
                    ];

                    for (const product of initialProducts) {
                              await addDoc(productsRef, product);
                    }

                    // 2. Seed Ek Dummy Order (Taake Order History page khali na lage)
                    const ordersRef = collection(db, "orders");
                    await addDoc(ordersRef, {
                              customer: {
                                        fullName: "Elena Vostkova",
                                        email: "elena@example.com",
                                        phone: "+1 (555) 000-0000",
                                        address: "123 Serenity Avenue",
                                        city: "New York",
                                        postcode: "10001"
                              },
                              items: [
                                        {
                                                  name: "Linen Essence Shirt",
                                                  price: 195,
                                                  quantity: 1,
                                                  size: "M",
                                                  image: initialProducts[0].image
                                        }
                              ],
                              totalAmount: 195,
                              status: "shipped",
                              paymentMethod: "COD",
                              createdAt: serverTimestamp()
                    });

                    console.log("Collections initialized successfully!");
          } catch (e) {
                    console.error("Error seeding DB: ", e);
          }
};