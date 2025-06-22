"use client";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Check,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Plus,
    Search,
    X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import items from "@/assets/svgs/inventory-items.svg";
import service from "@/assets/svgs/inventory-service.svg";
import medal from "@/assets/svgs/medal.svg";
import { PiUploadSimpleBold } from "react-icons/pi";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FiChevronDown } from "react-icons/fi";
interface ItemFormProps {}

export interface InventoryUnit {
    unit: string;
    name: string;
    initial: boolean;
}

const ItemForm: FC<ItemFormProps> = ({}) => {
    const [itemType, setItemType] = useState<"item" | "service">("item");
    const [openSuccess, setOpenSuccess] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const router = useRouter();
    const [position, setPosition] = useState<number>(1);
    const maxItemPosition = 4;
    const maxServicePosition = 3;

    const moveForward = () => {
        if (itemType === "item") {
            if (position < maxItemPosition) {
                setPosition((prev) => prev + 1);
            }
        } else {
            if (position < maxServicePosition) {
                setPosition((prev) => prev + 1);
            }
        }
    };
    const moveBackward = () => {
        if (position > 1) {
            setPosition((prev) => prev - 1);
        }
    };

    const toggleItemType = () => {
        setItemType((prev) => {
            if (prev === "item") {
                return "service";
            } else {
                return "item";
            }
        });
    };

    return (
        <div className="flex relative flex-col h-full w-full bg-brand/[2%]">
            {/* header */}
            <div className="max-h-[66px] flex flex-1 px-7 items-center justify-between sticky -top-5 z-40 py-2 bg-white border-b border-[#E8E8E8]">
                <Button
                    variant={"outline"}
                    size={"icon"}
                    disabled={position === 1}
                    className="rounded-full"
                    onClick={moveBackward}
                >
                    <ChevronLeft className="size-5" />
                </Button>
                <div className="flex flex-1 max-w-[70%] flex-col space-y-2">
                    <div className="flex flex-1 justify-between items-center">
                        <span className="text-[#474747] capitalize">
                            Add New {itemType}
                        </span>
                        <span className="text-[#242424]">
                            {position} /{" "}
                            {itemType === "item"
                                ? maxItemPosition
                                : maxServicePosition}
                        </span>
                    </div>
                    <div className="flex h-5 gap-x-5 flex-1 justify-between items-center">
                        {Array.from(
                            {
                                length:
                                    itemType === "item"
                                        ? maxItemPosition
                                        : maxServicePosition,
                            },
                            (_, i) => i + 1
                        ).map((pos) => (
                            <span
                                key={pos}
                                className={`h-2 rounded-full flex-1 transition-colors duration-300 ${
                                    pos <= position
                                        ? "bg-brand"
                                        : "bg-[#E8E8E8]"
                                }`}
                            />
                        ))}
                    </div>
                </div>
                <Button
                    variant={"outline"}
                    size={"icon"}
                    className="rounded-full"
                    onClick={() => router.push("/inventory")}
                >
                    <X className="size-5 text-[#8F8F8F]" />
                </Button>
            </div>
            {/* body */}
            <div className="overflow-y-auto flex-1">
                <div className="flex-1 min-h-[400px] max-w-[717px] min-w-[717px] mx-auto py-5">
                    {position === 1 && (
                        <BasicDetailsComponent
                            itemType={itemType}
                            toggleItemType={toggleItemType}
                        />
                    )}
                    {position === 2 && <PricingComponent  />}
                    {position === 3 && (
                        <>
                            {itemType === "item" ? (
                                <StockComponent />
                            ) : (
                                <QualityComponent />
                            )}
                        </>
                    )}
                    {position === 4 && <QualityComponent  />}
                </div>
            </div>
            {/* footer */}
            <div
                style={{ boxShadow: "0 -4px 6px -4px rgba(0, 0, 0, 0.1)" }}
                className="flex px-10 py-4 border-t bg-white mt-auto border-[#E8E8E8] justify-between items-center"
            >
                {position === 1 ? (
                    <Button
                        variant={"outline"}
                        onClick={() => router.push("/inventory")}
                    >
                        Cancel
                    </Button>
                ) : (
                    <Button variant={"outline"} onClick={moveBackward}>
                        <ChevronLeft /> Back
                    </Button>
                )}
                {(itemType === "item" && position < maxItemPosition) ||
                (itemType === "service" && position < maxServicePosition) ? (
                    <Button onClick={moveForward}>
                        Next <ChevronRight />
                    </Button>
                ) : (
                    <div>
                        <Button onClick={() => setOpenSuccess(true)}>
                            Save
                        </Button>

                     
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemForm;

const BasicDetailsComponent: FC<{
  itemType: "item" | "service";
  toggleItemType: () => void;
}> = ({ itemType, toggleItemType }) => {
  const [gstNumber, setGstNumber] = useState("");
  const [noGst, setNoGst] = useState(false);
  const [businessType, setBusinessType] = useState("");

  return (
    <div className="flex flex-col space-y-6 text-sm mt-6">

      {/* Two-column layout */}

         <div className="flex-1 p-2">
                                <div className="h-[100px] w-full rounded flex flex-col gap-2 justify-center items-center border-dashed border border-brand bg-brand/5">
                                    <PiUploadSimpleBold className="size-5 text-brand" />
                                    <div className="flex gap-1 items-center">
                                        <span className="text-[#6B6B6B]">
                                           Drag & Drop file here or
                                        </span>
                                        
                                    </div>
                                </div>
                            </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Business Name */}

         
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            <span className="text-red-500">*</span> Full Business Name :
            <span className="ml-1 text-gray-400 cursor-pointer" title="Enter your legal business name">ⓘ</span>
          </label>
          <input
            type="text"
            placeholder="Ex. Deleux Enterprise"
            className="mt-1 border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Business Type */}
        <div className="flex flex-col relative">
          <label className="text-sm font-medium text-gray-700">
            <span className="text-red-500">*</span> Business Type :
          </label>
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="mt-1 appearance-none border border-gray-300 rounded-md px-3 py-2 pr-8 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="proprietor">Proprietor</option>
            <option value="partnership">Partnership</option>
            <option value="pvt">Private Ltd.</option>
          </select>
          {/* Chevron Icon */}
          <FiChevronDown className="absolute right-3 bottom-3 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Checkbox + GST Field */}
      <div className="flex flex-col gap-4">
        {/* Checkbox */}
        <div className="flex items-center justify-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={noGst}
              onChange={() => setNoGst(!noGst)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-gray-700">I don’t have a GST number</span>
          </label>
        </div>

        {/* GST Number */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            <span className="text-red-500">*</span> GST Number :
          </label>
          <input
            type="text"
            placeholder="Start Writing the registered Number"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
            disabled={noGst}
            className={`mt-1 border ${
              noGst ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            } border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          />
        </div>
      </div>
    </div>
  );
};


 function PricingComponent() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  return (
    <div className="bg-[#F9FBFF] p-6 rounded-md text-sm text-gray-700">
      <h2 className="text-xl font-semibold mb-6">
        Mention the Business’s Address
      </h2>

      {/* Address Line 1 */}
      <div className="mb-4">
        <label className="block font-medium">
          <span className="text-red-500">*</span> Address Line 1 :
        </label>
        <input
          type="text"
          placeholder="Enter the Street name"
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 placeholder:text-gray-400"
        />
      </div>

      {/* Address Line 2 */}
      <div className="mb-6">
        <label className="block font-medium text-gray-600">
          Address Line 2 <span className="text-gray-400">(optional)</span> :
        </label>
        <input
          type="text"
          placeholder="Enter the Street name"
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 placeholder:text-gray-400"
        />
      </div>

      {/* Divider */}
      <hr className="border-gray-300 my-4" />

      {/* Country */}
      <div className="mb-4">
        <label className="block font-medium">
          <span className="text-red-500">*</span> Country :
        </label>
        <input
          type="text"
          value="India"
          readOnly
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-700"
        />
      </div>

      {/* State and City */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* State */}
        <div className="flex-1 relative">
          <label className="block font-medium">
            <span className="text-red-500">*</span> State :
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 appearance-none"
          >
            <option value="">Select the State Name</option>
            <option value="maharashtra">Maharashtra</option>
            <option value="delhi">Delhi</option>
            <option value="karnataka">Karnataka</option>
          </select>
          <FiChevronDown className="absolute right-3 bottom-3 text-gray-500 pointer-events-none" />
        </div>

        {/* City */}
        <div className="flex-1">
          <label className="block font-medium">
            <span className="text-red-500">*</span> City :
          </label>
          <input
            type="text"
            placeholder="Select the City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* PIN Code */}
      <div>
        <label className="block font-medium">
          <span className="text-red-500">*</span> PIN Code :
        </label>
        <input
          type="text"
          placeholder="Enter the Street name"
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}





 function StockComponent() {
  const [showSelector, setShowSelector] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [warehouses, setWarehouses] = useState<string[]>([]);
  const [selectedWarehouses, setSelectedWarehouses] = useState<string[]>([]);

  const toggleWarehouseSelection = (name: string) => {
    setSelectedWarehouses((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="p-6 bg-[#F9FBFF] rounded-md text-sm max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#333]">Add warehouses...</h2>
        <button className="text-blue-600 text-sm font-medium hover:underline">
          Skip for Now →
        </button>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <p className="flex items-center gap-2 font-medium">
          🏭 Warehouses <span className="text-blue-600">{warehouses.length}</span>
        </p>
        <p className="text-gray-600">Add warehouse for this business</p>
      </div>

      {/* Warehouse Cards or Empty State */}
      {warehouses.length > 0 ? (
        <div className="space-y-3">
          {warehouses.map((wh, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-white px-4 py-3 rounded shadow-sm"
            >
              <div>
                <p className="font-semibold">{wh}</p>
                <p className="text-gray-500 text-sm">Address for {wh}</p>
              </div>
              <button
                onClick={() =>
                  setWarehouses((prev) => prev.filter((w) => w !== wh))
                }
                className="text-red-500 hover:text-red-700 text-lg"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-8">
          <img
            src="/warehouse-empty.png"
            alt="Add Warehouse"
            className="mx-auto w-24 h-24 object-contain"
          />
          <button
            onClick={() => setShowSelector(true)}
            className="mt-4 text-blue-600 font-medium text-sm hover:underline"
          >
            + Add Warehouse
          </button>
        </div>
      )}

      {/* Selector Modal */}
      {showSelector && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-[500px]">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-lg font-semibold flex items-center gap-2">🏭 Warehouses</h3>
              <button
                onClick={() => setShowSelector(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="flex justify-between items-center px-5 pt-4">
              <p className="text-sm text-gray-600">
                Choose from existing warehouses of other Businesses
              </p>
              <button
                onClick={() => {
                  setShowSelector(false);
                  setShowForm(true);
                }}
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                + Add New Warehouse
              </button>
            </div>

            <div className="px-5 py-4 max-h-64 overflow-y-auto space-y-2">
              {[
                { name: 'Zamin Zilla', address: '42 Mall Road, opp Netaji bose lane' },
                { name: 'Pratapgarh', address: '42-7 Bleeker Street, Mahavir Singh Colony' },
                { name: 'Raigarh', address: '123 Havildar Street, opp Ordinance' },
              ].map((wh) => (
                <label
                  key={wh.name}
                  className={`flex items-start gap-3 p-3 rounded cursor-pointer ${
                    selectedWarehouses.includes(wh.name)
                      ? 'bg-gray-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedWarehouses.includes(wh.name)}
                    onChange={() => toggleWarehouseSelection(wh.name)}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{wh.name}</p>
                    <p className="text-sm text-gray-500">{wh.address}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="px-5 py-3 border-t flex justify-between items-center">
              <button
                onClick={() => setShowSelector(false)}
                className="text-sm text-gray-600 hover:underline"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setWarehouses((prev) => [...prev, ...selectedWarehouses]);
                  setSelectedWarehouses([]);
                  setShowSelector(false);
                }}
                className="bg-blue-600 text-white text-sm font-medium px-5 py-1.5 rounded hover:bg-blue-700"
              >
                ✔ Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
{showForm && (
  <div className="fixed inset-0 z-[100] bg-black/50 flex items-start justify-center pt-10 overflow-auto">
    <div className="bg-white rounded-xl w-full max-w-[620px] p-6 shadow relative">
      {/* Close Button */}
      <button
        className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 border border-[#E8E8E8] h-8 w-8 rounded-full flex items-center justify-center"
        onClick={() => setShowForm(false)}
      >
        ✕
      </button>

      {/* Modal Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b border-gray-200 pb-2">
          🏢 New Warehouse
        </h2>
      </div>

      {/* Form Grid */}
      <div className="space-y-4">
        {/** Form Row Helper */}
        {[
          { label: 'Warehouse Name', placeholder: 'Enter Full Name', required: true },
          { label: 'Contact Person', placeholder: 'Enter Full Name' },
        ].map(({ label, placeholder, required }, i) => (
          <div key={i} className="flex items-center gap-4">
            <label className="w-[160px] text-sm text-gray-700 font-medium">
              {required && <span className="text-red-500">*</span>} {label} :
            </label>
            <input
              type="text"
              placeholder={placeholder}
              className="flex-1 border rounded px-3 py-2 text-sm placeholder-gray-400"
            />
          </div>
        ))}

        {/* Contact Number */}
        <div className="flex items-center gap-4">
          <label className="w-[160px] text-sm text-gray-700 font-medium">
            Contact number :
          </label>
          <div className="flex flex-1">
            <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l bg-gray-100 text-sm">
              🇮🇳
            </span>
            <input
              type="tel"
              placeholder="Enter the Party’s Contact Number"
              className="w-full border border-gray-300 rounded-r px-3 py-2 text-sm placeholder-gray-400"
            />
          </div>
        </div>

        {/* Address Header */}
        <div className="border-t pt-4 mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Address</h3>
        </div>

        {/* Address Fields */}
        <div className="space-y-3">
          {[
            {
              label: 'Address Line 1',
              placeholder: 'Enter the Street name',
              required: true,
            },
            {
              label: 'Address Line 2 (optional)',
              placeholder: 'Enter the Street name',
            },
            {
              label: 'Country',
              placeholder: '',
              readOnly: true,
              value: 'India',
              required: true,
            },
            {
              label: 'State',
              placeholder: 'Select the State Name',
              required: true,
            },
            {
              label: 'City',
              placeholder: 'Select the City',
              required: true,
            },
            {
              label: 'PIN Code',
              placeholder: 'Enter the Street name',
              required: true,
            },
          ].map(({ label, placeholder, readOnly, value, required }, i) => (
            <div key={i} className="flex items-center gap-4">
              <label className="w-[160px] text-sm text-gray-700 font-medium">
                {required && <span className="text-red-500">*</span>} {label} :
              </label>
              <input
                type="text"
                placeholder={placeholder}
                value={value}
                readOnly={readOnly}
                className={`flex-1 border rounded px-3 py-2 text-sm placeholder-gray-400 ${
                  readOnly ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t">
        <button
          className="text-sm font-medium text-gray-600 hover:text-gray-800"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white text-sm font-medium px-6 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowForm(false)}
        >
          Save →
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

// Inline reusable form row
const FormRow = ({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) => (
  <div className="flex items-center gap-4">
    <label className="w-44 text-sm font-medium text-gray-700">
      {required && <span className="text-red-500">*</span>} {label}
    </label>
    <div className="flex-1">{children}</div>
  </div>
);







 



function QualityComponent() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const closeModal = () => {
    setStep(1);
    setShowModal(false);
  };

  return (
    <>
   (
    <div className="min-h-screen bg-[#f9fafb] px-6 md:px-12 pt-10">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-[17px] font-medium text-gray-800">Add Bank Accounts to this Business</h1>

          <div className="flex items-center gap-2 mt-2">
            
            <span className="text-sm text-gray-800 font-medium">Banks</span>
            <span className="text-blue-600 text-sm">0</span>
          </div>

          <p className="text-sm text-gray-500 mt-1">Assign and link Banks with this Business</p>
        </div>

        <button className="text-blue-600 text-sm font-medium hover:underline mt-1">
          Skip for Now <span className="ml-1">→</span>
        </button>
      </div>

      {/* Center Illustration & CTA */}
      <div className="flex flex-col items-center justify-center mt-20">
        <img
          src="/bank-empty.png" // Replace with actual image path
          alt="Bank Icon"
          className="w-24 h-24 mb-4"
        />

        <button
          
          className="text-blue-600 font-medium text-sm hover:underline"
        >
          + Link Bank Account
        </button>
      </div>
    </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-start pt-20">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ×
            </button>

            {step === 1 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Choose your Bank Account</h2>
                <div className="space-y-3">
                  {["Bank of Baroda", "HDFC Bank", "IDBI Bank"].map((bank) => (
                    <label
                      key={bank}
                      className="border p-3 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="bank"
                        onChange={() => setSelectedBank(bank)}
                      />
                      <span>{bank}</span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    + New Bank
                  </button>
                  <button
                    onClick={() => selectedBank && setStep(3)}
                    disabled={!selectedBank}
                    className={`bg-blue-600 text-white px-4 py-2 rounded ${
                      !selectedBank ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Add Bank
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Bank Account</h2>
                <label className="block text-sm font-medium mb-1">
                  * Enter Bank Name
                </label>
                <input
                  className="border px-3 py-2 rounded w-full mb-4"
                  type="text"
                  placeholder="Enter Bank Name"
                />

                <p className="text-center text-sm text-gray-500 mb-4">Or</p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    "SBI Bank",
                    "Axis Bank",
                    "ICICI Bank",
                    "HDFC Bank",
                    "PNB Bank",
                    "Bank of Baroda",
                    "IDBI Bank",
                    "Central Bank of India",
                    "Kotak Mahindra Bank",
                    "YES Bank",
                  ].map((bank) => (
                    <button
                      key={bank}
                      className="border rounded px-3 py-2 text-sm hover:bg-gray-50"
                      onClick={() => {
                        setSelectedBank(bank);
                        setStep(3);
                      }}
                    >
                      {bank}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Proceed
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Bank Details</h2>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="col-span-2">
                    <label className="block mb-1">* Account Type</label>
                    <div className="flex gap-4">
                      <label>
                        <input type="radio" name="type" defaultChecked /> Current
                      </label>
                      <label>
                        <input type="radio" name="type" /> Savings
                      </label>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="block mb-1">Bank Name</label>
                    <input
                      readOnly
                      value={selectedBank || "HDFC Bank"}
                      className="border px-3 py-2 rounded w-full bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Account Holder Name</label>
                    <input className="border px-3 py-2 rounded w-full" />
                  </div>
                  <div>
                    <label className="block mb-1">Account Number</label>
                    <input className="border px-3 py-2 rounded w-full" />
                  </div>
                  <div>
                    <label className="block mb-1">IFSC Code</label>
                    <input className="border px-3 py-2 rounded w-full" />
                  </div>
                  <div>
                    <label className="block mb-1">Branch Name</label>
                    <input className="border px-3 py-2 rounded w-full" />
                  </div>
                  <div>
                    <label className="block mb-1">Location</label>
                    <input className="border px-3 py-2 rounded w-full" />
                  </div>
                  <div>
                    <label className="block mb-1">UPI ID</label>
                    <input className="border px-3 py-2 rounded w-full" />
                    <p className="text-green-600 text-xs mt-1">UPI ID confirmed</p>
                  </div>

                  <div className="col-span-1">
                    <label className="block mb-1">Opening Balance</label>
                    <input className="border px-3 py-2 rounded w-full" />
                  </div>
                  <div className="col-span-1">
                    <label className="block mb-1">Balance Type</label>
                    <select className="border px-3 py-2 rounded w-full">
                      <option>in Existing Balance</option>
                      <option>within existing Balance</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block mb-1">Mode</label>
                    <select className="border px-3 py-2 rounded w-full">
                      <option>Select Mode</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}







const ServiceAvailabilityComponent: FC = () => {
    const [inStoreService, setInStoreService] = useState<boolean>(false);
    const [onLocationService, setOnLocationService] = useState<boolean>(false);

    const distanceArray: string[] = ["5", "10", "15", "20", "25", "30"];
    return (
        <div className="">
            {/* heading and skip btn */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl text-[#474747] font-medium">
                        Service availability
                    </h2>
                    <p className="text-[#6B6B6B]">
                        Set the reach of the service
                    </p>
                </div>
                <Button
                    variant={"ghost"}
                    className="text-brand hover:text-brand"
                >
                    Skip for Now
                </Button>
            </div>
            <div className="flex flex-col text-sm my-8 pr-20 gap-y-8">
                {/* Service available in-store */}
                <div className="flex gap-x-2">
                    <span
                        onClick={() => setInStoreService((prev) => !prev)}
                        className={`size-4 mt-1 border-brand border rounded-xs ${
                            inStoreService ? "bg-brand" : "bg-white"
                        }`}
                    >
                        <Check className="size-4 text-white pr-[2px]" />
                    </span>
                    <div className="flex flex-col flex-1">
                        <h3 className="text-[#242424] font-semibold text-base">
                            Service available in-store
                        </h3>
                        <p className="text-[#6B6B6B] text-sm">
                            The service will only be available in your store or
                            warehouse
                        </p>
                    </div>
                </div>
                {/* Service available In-Location */}
                <div className="flex gap-x-2">
                    <span
                        onClick={() => setOnLocationService((prev) => !prev)}
                        className={`size-4 mt-1 border-brand border rounded-xs ${
                            onLocationService ? "bg-brand" : "bg-white"
                        }`}
                    >
                        <Check className="size-4 text-white pr-[2px]" />
                    </span>
                    <div className="flex flex-col flex-1">
                        <h3 className="text-[#242424] font-semibold text-base">
                            Service available In-Location
                        </h3>
                        <p className="text-[#6B6B6B] text-sm">
                            The service can be provided in Customer's location
                        </p>

                        <div className="flex flex-1 mt-5">
                            <span className="min-w-40 text-sm font-medium">
                                Range of service (km)
                            </span>

                            <Select disabled={!onLocationService}>
                                <SelectTrigger className="border rounded flex-1 bg-white border-[#D6D6D6] text-sm text-[#6B6B6B]">
                                    <SelectValue placeholder="Select distance" />
                                </SelectTrigger>
                                <SelectContent>
                                    {distanceArray.map((option, i) => (
                                        <SelectItem
                                            key={i}
                                            className="flex-1"
                                            value={option}
                                        >
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
