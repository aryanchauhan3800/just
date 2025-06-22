
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

export interface ProductItem {
    id: string;
    name: string;
    rate: number;
    quantity: number;
    amount: number;
    cost?: number;
    cgst?: number;
    sgst?: number;
    discount?: number;
}

interface ProductTableProps {
    productItems: ProductItem[];
    onItemChange: (id: string, field: keyof ProductItem, value: number | string) => void;
    onAddItem: () => void;
    onRemoveItem: (id: string) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
    productItems,
    onItemChange,
    onAddItem,
    onRemoveItem,
}) => {
    return (
        <div className="space-y-2">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40px] text-[#8F8F8F]">#</TableHead>
                            <TableHead className="text-[#8F8F8F]">Product / Service</TableHead>
                            <TableHead className="w-[40px]" />
                            <TableHead>
                                <span className="border-l-2 pl-2 text-[#8F8F8F]">Rate(₹)</span>
                            </TableHead>
                            <TableHead className="text-[#8F8F8F]">CGST %</TableHead>
                            <TableHead className="text-[#8F8F8F]">SGST %</TableHead>
                            <TableHead className="text-[#8F8F8F]">Discount %</TableHead>
                            <TableHead className="text-[#8F8F8F]">Quantity</TableHead>
                            <TableHead className="pl-0">
                                <span className="border-l-2 pl-2 text-[#8F8F8F]">Amount</span>
                            </TableHead>
                            <TableHead className="w-[40px]" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productItems.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => onItemChange(item.id, "name", e.target.value)}
                                        placeholder="Add product from inventory"
                                        className="w-60 border-none shadow-none focus-within:ring-0"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon" onClick={onAddItem}>
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={item.rate}
                                        onChange={(e) => onItemChange(item.id, "rate", parseFloat(e.target.value))}
                                        className="w-32 border-none shadow-none items-start"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={item.cgst ?? 0}
                                        onChange={(e) => onItemChange(item.id, "cgst", parseFloat(e.target.value))}
                                        className="w-24 border-none shadow-none items-start"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={item.sgst ?? 0}
                                        onChange={(e) => onItemChange(item.id, "sgst", parseFloat(e.target.value))}
                                        className="w-24 border-none shadow-none items-start"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={item.discount ?? 0}
                                        onChange={(e) => onItemChange(item.id, "discount", parseFloat(e.target.value))}
                                        className="w-24 border-none shadow-none items-start"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => onItemChange(item.id, "quantity", parseInt(e.target.value))}
                                        className="w-24 border-none shadow-none items-start"
                                    />
                                </TableCell>
                                <TableCell className="w-40 border-none shadow-none items-start pl-3">
                                    {item.amount.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon" onClick={() => onRemoveItem(item.id)}>
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};