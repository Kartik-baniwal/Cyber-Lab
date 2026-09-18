# Ubuntu workstation

Build independently with `bash scripts/build-ubuntu-image.sh` from the repository root.
The image is based on Ubuntu 24.04 and tagged `cyberrange/workstation-ubuntu:latest`.
The build does not modify or rebuild the Kali image.

Select **Ubuntu** when launching a website lab to use this image. The backend
supports an optional `UBUNTU_IMAGE` override; `KALI_IMAGE` remains separate.
Existing sessions keep their running containers; launch a new Ubuntu session
after updating and restarting the backend.

Includes a real Bash terminal, Python, editors, networking utilities, and sample
files for permissions and log-analysis exercises. Flags are injected per session.
The Linux fundamentals `pwd` restriction also applies to Ubuntu.
This image supplies the terminal workspace; it does not run a graphical desktop
or a browser-based IDE service.
