<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Penonton;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PenontonController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['store']]);
    }

    public function index()
    {
        $penoton = Penonton::all();
        return response()->json([
            'status' => 'success',
            'penonton' => $penoton,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string',
            'email' => 'required|string|email',
            'no_telp' => 'required|string',
            'umur' => 'required|integer',
            'alamat' => 'required|string',
        ]);

        $penonton = Penonton::create([
            'nama' => $request->nama,
            'email' => $request->email,
            'no_telp' => $request->no_telp,
            'umur' => $request->umur,
            'alamat' => $request->alamat,
            'kode_tiket' => Str::random(5),
            'status' => 'unchecked'
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'penonton$penonton created successfully',
            'penonton' => $penonton,
        ]);
    }

    public function show($idTiket)
    {
        $penoton = Penonton::where('status', 'unchecked')->where('kode_tiket', $idTiket)->first();
        return response()->json([
            'status' => 'success',
            'penonton' => $penoton,
        ]);
    }

    public function update($idTiket)
    {
        $penonton = Penonton::where('status', 'unchecked')->where('kode_tiket', $idTiket)->first();
        $penonton->status = 'check-in';
        $penonton->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Penonton updated successfully',
            'penonton' => $penonton,
        ]);
    }

    public function destroy($id)
    {
        $todo = Penonton::find($id);
        $todo->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Todo deleted successfully',
            'todo' => $todo,
        ]);
    }
}
