export default function ActionButtons({ challenge }) {
  if (challenge.status === "DRAFT") {
    return (
      <button className="bg-green-600 px-4 py-2 rounded">
        Start Challenge
      </button>
    );
  }

  if (challenge.status === "ACTIVE") {
    return <div className="text-green-400">In Progress</div>;
  }

  return null;
}