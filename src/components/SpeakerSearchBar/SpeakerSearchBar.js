
const SpeakerSearchBar = ({ searchQuery, setSearchQuery }) => (
    <div className="mb-6 ">
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            value={searchQuery}
            placeholder="Search by name"
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    </div>
)

export default SpeakerSearchBar;