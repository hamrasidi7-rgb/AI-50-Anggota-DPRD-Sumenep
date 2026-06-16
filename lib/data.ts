export interface Member {
  id: number
  name: string
  ini: string
  fraksi: string
  komisi: string
  dapil: string
  jabatan: string
}

export interface Message {
  role: 'persona' | 'user'
  text: string
}

export const INTRO =
  'Selamat datang. Silakan pilih Anggota DPRD untuk menyalurkan aspirasi Anda terkait tugas, fungsi, aspirasi masyarakat, pokok pikiran, kegiatan, maupun informasi DPRD Kabupaten Sumenep.'

export const REPLIES = [
  'Terima kasih atas aspirasi yang Bapak/Ibu sampaikan. Persoalan ini akan saya catat dan saya teruskan dalam rapat {komisi} untuk ditindaklanjuti bersama mitra kerja terkait.',
  'Saya mengapresiasi masukan ini. Sebagai wakil dari {dapil}, saya berkomitmen mengawal usulan tersebut melalui pokok-pokok pikiran DPRD agar masuk dalam pembahasan anggaran.',
  'Aspirasi seperti ini sangat penting bagi kami. Mohon sertakan lokasi dan rincian kebutuhannya agar dapat kami verifikasi di lapangan dan kami perjuangkan pada masa sidang berikutnya.',
  'Baik, akan saya sampaikan kepada Pemerintah Kabupaten melalui mekanisme rapat dengar pendapat. Partisipasi masyarakat seperti inilah yang kami harapkan demi kemajuan Sumenep.',
]

const ASSIGN: Record<number, [string, string]> = {
  23: ['Pimpinan', 'Ketua DPRD'],       50: ['Pimpinan', 'Wakil Ketua DPRD'],
  44: ['Pimpinan', 'Wakil Ketua DPRD'], 26: ['Pimpinan', 'Wakil Ketua DPRD'],
  41: ['Komisi I', 'Ketua Komisi I'],   20: ['Komisi I', 'Wakil Ketua Komisi I'],
  39: ['Komisi I', 'Sekretaris Komisi I'],
   9: ['Komisi I', ''],  25: ['Komisi I', ''],  42: ['Komisi I', ''],
   4: ['Komisi I', ''],  22: ['Komisi I', ''],   7: ['Komisi I', ''],
  13: ['Komisi II', 'Ketua Komisi II'],  16: ['Komisi II', 'Wakil Ketua Komisi II'],
  17: ['Komisi II', 'Sekretaris Komisi II'],
   2: ['Komisi II', ''], 35: ['Komisi II', ''], 38: ['Komisi II', ''],
  12: ['Komisi II', ''], 24: ['Komisi II', ''], 11: ['Komisi II', ''],
  30: ['Komisi II', ''],  1: ['Komisi II', ''], 32: ['Komisi II', ''], 37: ['Komisi II', ''],
  28: ['Komisi III', 'Ketua Komisi III'], 45: ['Komisi III', 'Wakil Ketua Komisi III'],
   5: ['Komisi III', 'Sekretaris Komisi III'],
   6: ['Komisi III', ''], 43: ['Komisi III', ''], 27: ['Komisi III', ''],
  46: ['Komisi III', ''], 48: ['Komisi III', ''], 10: ['Komisi III', ''],
  40: ['Komisi III', ''],  8: ['Komisi III', ''], 15: ['Komisi III', ''],
  14: ['Komisi III', ''], 49: ['Komisi III', ''],
  36: ['Komisi IV', 'Ketua Komisi IV'], 21: ['Komisi IV', 'Wakil Ketua Komisi IV'],
  31: ['Komisi IV', 'Sekretaris Komisi IV'],
  19: ['Komisi IV', ''], 47: ['Komisi IV', ''],  3: ['Komisi IV', ''],
  34: ['Komisi IV', ''], 18: ['Komisi IV', ''], 33: ['Komisi IV', ''], 29: ['Komisi IV', ''],
}

const RAW: [string, string, string][] = [
  ['Rasiidi',                        'PKB',      'Dapil 1'],
  ['Agus Hariyanto',                 'Gerindra',  'Dapil 1'],
  ['Nia Kurnia',                     'PDI-P',     'Dapil 1'],
  ['Sutan Hady Tjahyadi',            'PDI-P',     'Dapil 1'],
  ['Wiwid Harjo Yudanto',            'PKS',       'Dapil 1'],
  ['Musahwi',                        'PAN',       'Dapil 1'],
  ['Hairul Anam',                    'PPP',       'Dapil 1'],
  ['Akhmadi Yazid',                  'PKB',       'Dapil 2'],
  ['Holik',                          'Gerindra',  'Dapil 2'],
  ['Eka Bahas Nur Ardiansyah',       'PDI-P',     'Dapil 2'],
  ['Salahuddin',                     'PDI-P',     'Dapil 2'],
  ['Samsiyadi',                      'NasDem',    'Dapil 2'],
  ['Faisal Muhlis',                  'PAN',       'Dapil 2'],
  ['Afrian Mukhlash',                'Demokrat',  'Dapil 2'],
  ['Eksan',                          'PKB',       'Dapil 3'],
  ['Irwan Hayat',                    'PKB',       'Dapil 3'],
  ['Abd. Rahman',                    'PDI-P',     'Dapil 3'],
  ['M. Ramzi',                       'Hanura',    'Dapil 3'],
  ['Siti Hosna',                     'PAN',       'Dapil 3'],
  ['Akhmad Jazuli',                  'Demokrat',  'Dapil 3'],
  ["Moh. Asy'ari Motkhar",           'PPP',       'Dapil 3'],
  ['Muhammad Mirza Khumaini Hamid',  'PKB',       'Dapil 4'],
  ['H. Zainal (Arifin)',             'PDI-P',     'Dapil 4'],
  ['Ersat',                          'NasDem',    'Dapil 4'],
  ['Hairul Anwar',                   'PAN',       'Dapil 4'],
  ['Indra Wahyudi',                  'Demokrat',  'Dapil 4'],
  ['Abd. Rahman',                    'PPP',       'Dapil 4'],
  ['M. Muhri',                       'PKB',       'Dapil 5'],
  ['Virzannida',                     'PKB',       'Dapil 5'],
  ['Endi',                           'PDI-P',     'Dapil 5'],
  ['Afrilia Wahyuni',                'NasDem',    'Dapil 5'],
  ['Moh. Fendi',                     'Demokrat',  'Dapil 5'],
  ['Sami Oeddin',                    'PKB',       'Dapil 6'],
  ['Umar',                           'PDI-P',     'Dapil 6'],
  ['Gunaifi Syarif Arrodi',          'PAN',       'Dapil 6'],
  ['Mulyadi',                        'Demokrat',  'Dapil 6'],
  ['Masdawi',                        'Demokrat',  'Dapil 6'],
  ['Juhari',                         'PPP',       'Dapil 6'],
  ['Saipur Rahman',                  'PKB',       'Dapil 7'],
  ['Hosnan',                         'PDI-P',     'Dapil 7'],
  ['Darul Hasyim Fath',              'PDI-P',     'Dapil 7'],
  ['Ahmad Juhairi',                  'NasDem',    'Dapil 7'],
  ["Mas'ud Ali",                     'PPP',       'Dapil 7'],
  ['Dulsiam',                        'PKB',       'Dapil 8'],
  ['Wahyudi',                        'PDI-P',     'Dapil 8'],
  ["Muta'em",                        'NasDem',    'Dapil 8'],
  ['Syamsul Bahri',                  'PKS',       'Dapil 8'],
  ['Badrul Aini',                    'PBB',       'Dapil 8'],
  ['Mohammad Hanafi',                'Demokrat',  'Dapil 8'],
  ['M. Syukri',                      'PPP',       'Dapil 8'],
]

function initials(name: string): string {
  const parts = name.replace(/\./g, '').split(' ').filter(Boolean)
  return ((parts[0]?.[0] ?? '') + (parts[1] ? parts[1][0] : (parts[0]?.[1] ?? ''))).toUpperCase()
}

export const MEMBERS: Member[] = RAW.map(([name, fraksi, dapil], i) => {
  const id = i + 1
  const [komisi, jabatan] = ASSIGN[id] ?? ['', '']
  return { id, name, ini: initials(name), fraksi, komisi, dapil, jabatan }
})

export const SOROTAN_IDS = [23, 50, 44, 26, 41, 13, 28, 36]
export const SOROTAN = SOROTAN_IDS.map(id => MEMBERS.find(m => m.id === id)!)

export const FRAKSI_OPTIONS = ['PKB','PDI-P','Gerindra','NasDem','PAN','PPP','Demokrat','PKS','Hanura','PBB']
export const KOMISI_OPTIONS = ['Pimpinan','Komisi I','Komisi II','Komisi III','Komisi IV']
export const DAPIL_OPTIONS  = ['Dapil 1','Dapil 2','Dapil 3','Dapil 4','Dapil 5','Dapil 6','Dapil 7','Dapil 8']
