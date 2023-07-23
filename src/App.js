import { useState } from "react";

const initialCustomers = [
  {
    id: 1836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=1836",

    address: "Pandora",
  },
  {
    id: 9372,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=9372",

    address: "Utipia",
  },
  {
    id: 496,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=496",

    address: "Wonderland",
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
export default function App(params) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  function handleShowAddCustomer() {
    setShowAddCustomer((show) => !show);
    setSelectedCustomer(null);
  }
  function handleAddCustomer(newCustomer) {
    setCustomers((customers) => [...customers, newCustomer]);
    setShowAddCustomer(false);
  }
  function handleSelectedCustomer(customer) {
    setSelectedCustomer((cur) => (cur?.id === customer.id ? null : customer));
    setShowAddCustomer(false);
  }
  function handleEditCustomer(editCustomer) {
    setCustomers((customers) =>
      customers.map((customer) =>
        customer.id === selectedCustomer.id
          ? {
              ...customer,
              name: editCustomer.name,
              image: editCustomer.image,
              address: editCustomer.address,
            }
          : customer
      )
    );
    setSelectedCustomer(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <CustomerList
          customers={customers}
          onSelectedCustomer={handleSelectedCustomer}
          selectedCustomer={selectedCustomer}
        />
        {showAddCustomer && (
          <FormAddCustomer onAddCustomer={handleAddCustomer} />
        )}

        <Button onClick={handleShowAddCustomer}>
          {showAddCustomer ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedCustomer && (
        <FormEditCustomer
          selectedCustomer={selectedCustomer}
          onEditCustomer={handleEditCustomer}
        />
      )}
    </div>
  );
}

function CustomerList({ customers, onSelectedCustomer, selectedCustomer }) {
  return (
    <ul>
      {customers.map((customer) => (
        <Customer
          key={customer.id}
          customer={customer}
          onSelectedCustomer={onSelectedCustomer}
          selectedCustomer={selectedCustomer}
        />
      ))}
    </ul>
  );
}

function Customer({ customer, onSelectedCustomer, selectedCustomer }) {
  const isSelect = selectedCustomer?.id === customer?.id;
  return (
    <li className={isSelect ? "selected" : ""}>
      <img src={customer.image} alt={customer.name} />
      <h3>{customer.name}</h3>
      <p>
        {customer.name}'s address is {customer.address}
      </p>
      <Button onClick={() => onSelectedCustomer(customer)}>
        {isSelect ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddCustomer({ onAddCustomer }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const [address, setAddress] = useState("");
  const id = crypto.randomUUID();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !address || !image) return;
    const newCustomer = { id: id, name, image: `${image}?u=${id}`, address };
    console.log(newCustomer);
    onAddCustomer(newCustomer);
  }
  return (
    <form className="form-add-customer" onSubmit={handleSubmit}>
      <label>🎀Customer Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>👕Customer Image</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <label>🌏Customer Address</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}
function FormEditCustomer({ selectedCustomer, onEditCustomer }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  console.log(name);
  function handleEdit(e) {
    e.preventDefault();
    if (!name || !image || !address) return;
    const editCustomer = { name, image, address };
    onEditCustomer(editCustomer);
  }
  return (
    <form className="form-edit-customer" onSubmit={handleEdit}>
      <h2>edit {selectedCustomer?.name}'s info 🖋🖊🖌</h2>
      <label>🎎Customer Name</label>
      <input
        type="text"
        value={name === "" ? `${selectedCustomer?.name}` : ""}
        onChange={(e) => setName(e.target.value)}
      />
      <label>👗Customer Image</label>
      <input
        type="text"
        value={image === "" ? `${selectedCustomer?.image}` : ""}
        onChange={(e) => setImage(e.target.value)}
      />
      <label>🌏Customer Address</label>
      <input
        type="text"
        value={address === "" ? `${selectedCustomer?.address}` : ""}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}
