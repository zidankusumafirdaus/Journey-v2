from dotenv import load_dotenv
from playhouse.migrate import *
from apps.models import create_tables
from apps.extensions import migrator, database

load_dotenv()

if __name__ == "__main__":
    print("📦 Membuat tabel jika belum ada...")
    create_tables()

    print("⚙️ Menjalankan migrasi...")
    with database.atomic():
        migrate(migrator.add_column('project', 'kategori', CharField(null=True)))
        print("✅ Kolom 'kategori' berhasil ditambahkan.")