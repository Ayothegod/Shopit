import { createClient } from "next-sanity";

export default function TestSanity({ pets }) {
  return (
    <>
      <header>
        <h1>Sanity + Next.js</h1>
      </header>
      <main>
        <h2>pets</h2>
        {pets.length > 0 && (
          <ul>
            {pets.map((pet) => (
              <li key={pet._id}>{pet?.name}</li>
            ))}
          </ul>
        )}
        {!pets.length > 0 && <p>No pets to show</p>}
        {pets.length > 0 && (
          <div>
            <pre>{JSON.stringify(pets,null,2)}</pre>
          </div>
        )}
        {!pets.length > 0 && (
          <div>
            <div>¯\_(ツ)_/¯</div>
            <p>
              Your data will show up here when you've configured everything
              correctly
            </p>
          </div>
        )}
      </main>
    </>
  );
}

// const client = createClient();
const client = createClient({
  projectId: "s2h76ee6",
    dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false
});

export async function getStaticProps() {
  

  const pets = await client.fetch(`*[_type == "shirts"]`);
  
  return {
      props: {
      pets
    }
};
}
//   const pets = [
//      {
//       _createdAt: "2022-03-08T09:28:00Z",
//       _id: "1f69c53d-418a-452f-849a-e92466bb9c75",
//       _rev: "xnBg0xhUDzo561jnWODd5e",
//       _type: "pet",
//       _updatedAt: "2022-03-08T09:28:00Z",
//       name: "Capybara"
//     } 
//   ];