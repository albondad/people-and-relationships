import { useState } from "react";
import type { ChangeEvent } from "react";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const entityCreateMutation = api.entity.create.useMutation();
  const relationTypeCreateMutation = api.relationshipType.create.useMutation();
  const entityListQuery = api.entity.list.useQuery({});
  const [form, setForm] = useState({
    entityName: "",
    relationshipTypeName: "",
  });

  const handleAddButtonClick = () => {
    entityCreateMutation.mutate({ name: form.entityName });
  };

  const handleCreateRelationshipTypeClick = () => {
    relationTypeCreateMutation.mutate({ name: form.relationshipTypeName });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFormKey = event.target.name;
    const newformValue = event.target.value;
    const newForm = { ...form, [newFormKey]: newformValue };
    setForm(newForm);
  };

  console.log(hello.data?.greeting);

  return (
    <div className="flex w-1/2 flex-col gap-1 p-1">
      <h1 className="text-lg font-bold">Create an Entity</h1>
      <label>Name</label>
      <input
        className="block border p-1 hover:opacity-50"
        name="entityName"
        value={form.entityName}
        onChange={handleInputChange}
      ></input>
      <button
        className="block border p-1 hover:opacity-50"
        onClick={handleAddButtonClick}
      >
        Create Entity
      </button>

      <h1 className="text-lg font-bold">Create an Relationship Type</h1>
      <label>Name</label>
      <input
        name={"relationshipTypeName"}
        value={form.relationshipTypeName}
        onChange={handleInputChange}
        className="block border p-1 hover:opacity-50"
      ></input>
      <button
        className="block border p-1 hover:opacity-50"
        onClick={handleCreateRelationshipTypeClick}
      >
        Create Relationship Type
      </button>

      <h1 className="text-lg font-bold">Add a Relationship</h1>
      <label>Entity 1</label>
      <input className="block border p-1 hover:opacity-50"></input>
      <label>Entity 2</label>
      <input className="block border p-1 hover:opacity-50"></input>
      <label>Relationship</label>
      <input className="block border p-1 hover:opacity-50"></input>

      <h1 className="text-lg font-bold">Entities</h1>
      <table>
        <thead>
          <tr className="text-left">
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {entityListQuery.data?.map((element) => (
            <tr key={element.id}>
              <td>{element.id}</td>
              <td>{element.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
