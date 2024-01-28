export default function RandomFact({fact}) {
    return (
        <div className="bg-blue-200 p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
          <p className="text-lg">{fact}</p>
        </div>
      );
}