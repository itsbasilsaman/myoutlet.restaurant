import React, { useEffect, useRef, useState } from "react";
import {
  Plus,
  QrCode,
  Users,
  Edit,
  Trash2,
  Download,
  Settings,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/hooks/useDispatch";
import { fetchTablesAction } from "@/store/actions/fetchTablesAction";
import { addTableAction } from "@/store/actions/addTableAction";
import { updateTableAction } from "@/store/actions/updateTableAction";
import { deleteTableAction } from "@/store/actions/deleteTableAction";
import QRCode from "react-qr-code";

type Table = {
  id: string;
  table_name: string;
  seat_count: number;
  qrcode?: string;
  created_at?: string;
  updated_at?: string;
  is_active?: boolean;
  store_id?: string;
};

const QRCodeDisplay = ({
  tableId,
  tableName,
  qrcode,
  qrRef,
}: {
  tableId: string;
  tableName: string;
  qrcode?: string;
  qrRef: any;
}) => {
  const qrData = qrcode || `https://restaurant.myoutlet.app/table/${tableId}`;

  return (
    <div className="flex flex-col items-center p-4 bg-white border-2 border-gray-200 rounded-lg">
      <div className="p-4 bg-white border border-gray-300 rounded-lg mb-2">
        <QRCode value={qrData} size={128} ref={qrRef} />
      </div>
      <p className="text-sm font-medium text-[#040919] text-center">
        {tableName}
      </p>
      <p className="text-xs text-[#696868] text-center break-all">{qrData}</p>
    </div>
  );
};

const TableManagement = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTable, setEditingTable] = useState<Table | null>(null);
  const [formData, setFormData] = useState({ table_name: "", seat_count: 1 });

  const qrRef = useRef<SVGSVGElement>(null);

  const dispatch = useAppDispatch();

  const { data, token, tables } = useSelector(
    (state: RootState) => state.restaurant
  );
  console.log(tables, "table data from store");

  const storeId = data?.[0]?.id;
  const accessToken = token || Cookies.get("access_token");

  useEffect(() => {
    if (accessToken && storeId) {
      dispatch(fetchTablesAction({ storeId, token: accessToken }));
    }
  }, [storeId, accessToken, dispatch]);

  const handleAddTable = async () => {
    if (formData.table_name.trim() && storeId && accessToken) {
      await dispatch(
        addTableAction({
          storeId,
          token: accessToken,
          data: {
            table_name: formData.table_name,
            seat_count: formData.seat_count,
          },
        })
      );

      setFormData({ table_name: "", seat_count: 1 });
      setShowAddForm(false);
    }
  };

  const handleEditTable = (table: Table) => {
    setEditingTable(table);
    setFormData({ table_name: table.table_name, seat_count: table.seat_count });
    setShowAddForm(true);
  };

  const handleUpdateTable = async () => {
    if (editingTable && formData.table_name.trim() && accessToken) {
      await dispatch(
        updateTableAction({
          tableId: editingTable.id,
          token: accessToken,
          data: {
            table_name: formData.table_name,
            seat_count: formData.seat_count,
          },
        })
      );

      setEditingTable(null);
      setFormData({ table_name: "", seat_count: 1 });
      setShowAddForm(false);
    }
  };

  const handleDeleteTable = async (tableId: string) => {
    if (tableId && accessToken) {
      await dispatch(deleteTableAction({ tableId, token: accessToken }));
    }
  };

  const handleShowQR = (table: Table) => {
    setSelectedTable(table);
    setShowQRModal(true);
  };

  const handleDownloadQR = () => {
    const svg = qrRef.current;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const canvas = document.createElement("canvas");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `${selectedTable?.table_name || "qr-code"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgString)));
  };

  const resetForm = () => {
    setFormData({ table_name: "", seat_count: 1 });
    setShowAddForm(false);
    setEditingTable(null);
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-['Playfair_Display'] text-[#040919]">
            Table Management
          </h1>
          <p className="text-sm sm:text-base text-[#696868] mt-1">
            Manage your restaurant tables and generate QR codes
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-[#fe0000] text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm sm:text-base"
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          Add New Table
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#040919]">
                {editingTable ? "Edit Table" : "Add New Table"}
              </h2>
              <button
                onClick={resetForm}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#040919] mb-1">
                  Table Name
                </label>
                <input
                  type="text"
                  value={formData.table_name}
                  onChange={(e) =>
                    setFormData({ ...formData, table_name: e.target.value })
                  }
                  placeholder="Enter table name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fe0000] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#040919] mb-1">
                  Seat Count
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.seat_count}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seat_count: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fe0000] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={resetForm}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingTable ? handleUpdateTable : handleAddTable}
                className="flex-1 px-4 py-2 bg-[#fe0000] text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {editingTable ? "Update" : "Add"} Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && selectedTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#040919]">QR Code</h2>
              <button
                onClick={() => setShowQRModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <QRCodeDisplay
              tableId={selectedTable.id}
              tableName={selectedTable.table_name}
              qrcode={selectedTable.qrcode}
              qrRef={qrRef}
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleDownloadQR()}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-[#fe0000] text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tables Display */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <Settings className="h-6 w-6 text-[#fe0000]" />
            <span className="font-medium text-lg text-[#040919]">
              Restaurant Tables ({tables.length})
            </span>
          </div>
        </div>
        <div className="p-6">
          {tables.length === 0 ? (
            <div className="text-center text-[#696868] py-12">
              <Settings className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No tables configured</h3>
              <p className="text-sm mb-4">
                Add your first table to get started
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-[#fe0000] text-white rounded-lg hover:bg-red-700"
              >
                Add Table
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className="bg-[#fdfafa] border border-gray-200 rounded-lg p-4 hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-[#040919] text-lg">
                        {table.table_name}
                      </h3>
                      <div className="flex items-center text-[#696868] text-sm mt-1">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{table.seat_count} seats</span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEditTable(table)}
                        title="Edit"
                        className="p-1.5 text-[#696868] hover:text-[#040919] hover:bg-gray-100 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTable(table.id)}
                        title="Delete"
                        className="p-1.5 text-[#696868] hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleShowQR(table)}
                      className="w-full flex items-center justify-center px-3 py-2 bg-[#fe0000] text-white rounded-lg hover:bg-red-700 text-sm"
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      View QR Code
                    </button>
                    
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-[#696868] break-all">
                      {table.qrcode ||
                        `https://restaurant.myoutlet.app/table/${table.id}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Statistics Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#696868]">Total Tables</p>
              <p className="text-2xl font-bold text-[#040919]">
                {tables.length}
              </p>
            </div>
            <Settings className="h-8 w-8 text-[#fe0000]" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#696868]">Total Seats</p>
              <p className="text-2xl font-bold text-[#040919]">
                {tables.reduce((sum, table) => sum + table.seat_count, 0)}
              </p>
            </div>
            <Users className="h-8 w-8 text-[#fe0000]" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#696868]">
                Avg. Seats/Table
              </p>
              <p className="text-2xl font-bold text-[#040919]">
                {tables.length > 0
                  ? Math.round(
                      tables.reduce((sum, table) => sum + table.seat_count, 0) /
                        tables.length
                    )
                  : 0}
              </p>
            </div>
            <QrCode className="h-8 w-8 text-[#fe0000]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableManagement;
