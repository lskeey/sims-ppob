import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionHistory } from '../features/transaction/transactionApi';
import { formatDate, formatRupiah } from '../utils/index';

const HistoryTransaction = () => {
  const { history } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    dispatch(fetchTransactionHistory({ offset, limit }));
  }, [offset, limit, dispatch]);

  const handleShowMore = () => {
    setLimit((prevLimit) => prevLimit + 3);
  };

  return (
    <div className="flex flex-col space-y-4">
      {history.map((item, index) => {
        const isPayment = item.transaction_type === "TOPUP";
        const sign = isPayment ? '+' : '-';
        const textColor = isPayment ? 'text-green-600' : 'text-red-600';

        return (
          <div key={index} className="flex justify-between border px-4 py-2 rounded-md">
            <div>
              <div className={`text-lg font-semibold ${textColor}`}>
                {sign} {formatRupiah(item.total_amount)}
              </div>
              <div className="text-xs text-gray-400">
                <span>{formatDate(item.created_on)}</span>
              </div>
            </div>
            <div className="text-xs">{item.description}</div>
          </div>
        );
      })}
      <button 
        className="text-sm font-semibold text-red-600"
        onClick={handleShowMore}
      >
        Show more
      </button>
    </div>
  );
};

export default HistoryTransaction;
