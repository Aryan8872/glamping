import FilterModal from "./FilterModal";
import DateFilterContent from "./DateFilterContent";

export default function DateFilterModal({
  onClose,
  onChange,
  checkIn,
  checkOut,
}: {
  onClose: () => void;
  onChange: (checkIn: string, checkOut: string) => void;
  checkIn: string;
  checkOut: string;
}) {
  return (
    <FilterModal
      onClose={onClose}
      title="Select Dates"
      className="w-80"
      position="left"
    >
      <DateFilterContent
        checkIn={checkIn}
        checkOut={checkOut}
        onChange={onChange}
      />
    </FilterModal>
  );
}
