// import React from "react";
// import styles from "@/styles/Home.module.css";

// function Strapi({ products }) {
//   console.log(products);
//   return (
//     <main className={styles.main}>
//       <h1>hola</h1>
//       <ul>
//         {products.data.map((product) => (
//           <li key={product.id}>{product.attributes.title}</li>
//         ))}
//       </ul>
//     </main>
//   );
// }

// export async function getStaticProps() {
//   const apiUrl = process.env.API_URL;
//   const url = `${apiUrl}/api/products`;
//   const response = await fetch(url);
//   const products = await response.json();
//   return {
//     props: {
//       products,
//     },
//   };
// }
// export default Strapi;
