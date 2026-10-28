# Provenance and verification

This folder documents the integrity and authorship evidence for release **v3.0.1**.

| File | Content |
|---|---|
| `SHA256SUMS` | SHA-256 hash of each of the 27 files of the tagged tree `v3.0.1` (`sha256sum` format) |
| `SHA256SUMS.sig` | SSH signature (namespace `file`) of `SHA256SUMS` |
| `allowed_signers` | Public key used for the signature (public key only) |
| `SHA256SUMS.ots` | OpenTimestamps proof for `SHA256SUMS` |
| `COMMITMENT.txt` | SHA-256 hash of a private authorship string (see below) |
| `COMMITMENT.txt.ots` | OpenTimestamps proof for `COMMITMENT.txt` |
| `SHA256SUMS_versioni.txt` / `.ots` | Hash list of an archive of earlier versions (the archive itself is not published) and its OpenTimestamps proof |

The hashes in `SHA256SUMS` refer to the tree at tag `v3.0.1`. Files on `main` that changed after the tag will not match.

## 1. Verify the signature

Requires OpenSSH (`ssh-keygen`). Run inside this folder:

```
ssh-keygen -Y verify -f allowed_signers -I SOX403 -n file -s SHA256SUMS.sig < SHA256SUMS
```

Expected output: `Good "file" signature for SOX403 with ED25519 key SHA256:U8XB0OzpY3ZSE0AyoCpgEa3RD/94qDpn/Pq0as96mtM`

## 2. Verify the files of the release

1. Download the source archive of tag `v3.0.1` from the GitHub Release and extract it.
2. Run from inside the extracted folder, with the path of `SHA256SUMS` adjusted:

```
sha256sum -c /path/to/SHA256SUMS
```

Every line must report `OK`. `SHA256SUMS` must have LF line endings (this folder is excluded from line-ending conversion by `.gitattributes`).

## 3. Verify the timestamps

Open https://opentimestamps.org/, drop the `.ots` file together with the original file in the verification area. The panel reports the Bitcoin attestation once the proof is confirmed on the blockchain. Alternatively use the `ots verify` client with a Bitcoin node.

A confirmed proof shows that the file existed no later than the time of the referenced Bitcoin block.

## 4. Authorship commitment

`COMMITMENT.txt` contains the SHA-256 hash of a string of the form:

```
SOX-SERVICE-WEBPAGE-2026|<full legal name>|<64 random hexadecimal characters>
```

The string is kept private by the author. If the author reveals it, anyone can verify that its SHA-256 hash (UTF-8, no trailing newline) equals the value in `COMMITMENT.txt`. Together with `COMMITMENT.txt.ots`, this shows that the author held the string no later than the timestamp time.

PowerShell:

```
$s = Read-Host "String"
[BitConverter]::ToString([Security.Cryptography.SHA256]::Create().ComputeHash([Text.Encoding]::UTF8.GetBytes($s))).Replace("-","").ToLower()
```

Linux/macOS:

```
printf '%s' 'STRING' | sha256sum
```

The commitment proves knowledge of the string. It does not prove identity by itself.
