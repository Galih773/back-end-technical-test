<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penonton extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode_tiket',
        'nama',
        'email',
        'no_telp',
        'umur',
        'alamat',
        'status'
    ];
}
