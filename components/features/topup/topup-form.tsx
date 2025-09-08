import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TopUpForm() {
  const amounts = [10000, 20000, 50000, 100000, 250000, 500000];
  return (
    <div className="min-w-max space-y-10">
      <div>
        <h2 className="text-sm lg:text-md">Please Enter Your</h2>
        <span className="text-xl lg:text-2xl font-medium">Top Up Amount</span>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="w-full lg:w-4/12 lg:order-2 grid grid-flow-col grid-rows-2 gap-x-2 gap-y-4">
          {amounts.map((amount, index) => (
            <div
              key={index}
              className="flex justify-center p-2 border rounded-sm text-sm"
            >
              Rp{amount.toLocaleString("id-ID")}
            </div>
          ))}
        </div>
        <form className="w-full lg:w-8/12 lg:order-1">
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="top_up_amount" hidden>
                Top Up Amount
              </Label>
              <Input
                id="top_up_amount"
                type="number"
                placeholder="Enter Top Up Amount"
                className="text-sm rounded-xs no-spin-buttons"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-sm bg-red-500 hover:bg-red-600 cursor-pointer"
            >
              Top Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
