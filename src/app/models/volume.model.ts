export interface VolumeModel {
  status: string;
  vol_guid: string;
  name: string;
  used_pct: string;
  used: number;
  id: number;
  vol_encryptkey: string;
  vol_name: string;
  is_decrypted: boolean;
  avail: number;
  mountpoint: string;
  vol_encrypt: number;
  children: any[];
  locking: boolean;
  unlocking: boolean;
}
