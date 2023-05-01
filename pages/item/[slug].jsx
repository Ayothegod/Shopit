import { useRouter } from "next/router";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/utils/client";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import loader from "@/utils/asset/icons8-loading-50.png";
import Head from "next/head";
import Link from "next/link";
import {AiFillHeart} from "react-icons/ai"
import {FaCartPlus} from "react-icons/fa"
import { getDatabase, ref, set  } from "firebase/database";
import { useState } from "react";
import { database,app } from "@/utils/firebase";

const slug = ({ sneaker, recommendProduct }) => {
  // const database = getDatabase();
  const [name,setName] = useState("Ayomide")
  const [email,setEmail] = useState("Ayodasilva12@gmail.com")

  // const db = database();

function writeUserData(name,email) {
  const db = getDatabase(app);
  set(ref(db, 'users/' ), {
    username: name,
    email: email,
    // profile_picture : imageUrl
  });
}
const addData = () => {
 try {
   writeUserData()
   console.log("data saved successfully")
 } catch (error) {
  console.log("error :", error)
 }
}



  function urlFor(source) {
    return imageUrlBuilder(client).image(source);
  }

  return (
    <>
      <Head>
        <title>Shop It | product</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-[#ddd6d6] min-h-screen">
        <Header />

        <button onClick={addData} className="bg-red-600 p-4 rounded-md text-white">Add to db</button>
        <section className="p-2 my-1 bg-white">
          {/* <div className="max-w-[72rem] mx-auto ">

            <section className="flex flex-col sm:flex-row mb-20">
              {!sneaker && (
                <div className="grid place-items-center">
                  <Image src={loader} alt="loader" className="animate-spin " />
                  <p>Product is loading</p>
                </div>
              )}

              {sneaker?.image && (
                <div className="w-full h-60 sm:w-60 sm:h-60 md:w-80 md:h-80 relative rounded-md overflow-hidden border border-neutral-300">
                  <Image
                    src={urlFor(sneaker.image).url()}
                    alt={sneaker.title}
                    fill
                    className="w-full h-full absolute object-cover object-center"
                  />
                </div>
              )}
              <div>

              <h1>{sneaker?.title}</h1>
              <h1>{sneaker?.description}</h1>
              <h1>{sneaker?.price}</h1>
              </div>
              <div className="inline-block md:absolute">
                <div>
                  <button className="p-2 bg-orange-600 rounded-md text-white "><AiFillHeart/></button>
                        <button className="py-2 bg-orange-600 rounded-md text-white px-8"><FaCartPlus/></button>
                </div>
              </div>
            </section>

            <section>
              <div>
                <p>Recommended</p>
                <div className="flex gap-2 overflow-scroll overflow-y-hidden scroller py-2 ">
                  {recommendProduct && 
                  recommendProduct.map((product) => (
                    <div>
                      <Link href={`/item/${product?.slug.current}`}>
                        <div className="w-48 h-48 sm:h-48 sm:w-48 md:w-80 md:h-80 relative rounded-md overflow-hidden border border-neutral-300">
                          <Image
                            src={urlFor(product?.image).url()}
                            alt={product?.title}
                            fill
                            className="w-full h-full absolute object-cover object-center"
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

            </section>

          </div> */}
        </section>

        <Footer />
      </div>
    </>
  );
};
export default slug;

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const sneaker = await client.fetch(
    `
    *[_type in ["shorts", "sneakers","glasses","watches"] && slug.current == $slug][0]
    `,
    { slug }
  );
  const recommendProduct = await client.fetch(
    `*[_type in ["shorts", "sneakers","glasses","watches"] && position == "fifth" ] `
  );

  return {
    props: {
      sneaker,
      recommendProduct,
    },
  };
}

