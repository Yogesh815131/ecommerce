import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { icon, LatLng, LatLngTuple, LatLngExpression, Marker, map, Map, tileLayer, marker } from 'leaflet';
import { LocationService } from '../../../services/location.service';
import { Order } from '../../../shared/models/Order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() order!: Order;
  @Input() readonly = false;

  @ViewChild('map', { static: true }) mapRef!: ElementRef;
  currentMarker!: Marker;
  map!: Map;

  private readonly DEFAULT_LATLNG: LatLngTuple = [17.44, 78.45];
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl: 'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });

  constructor(private locationApi: LocationService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.order) return;
    if (this.map) {
      if (this.readonly && this.addressLatLng) {
        this.showLocationOnReadonlyMode();
      } else {
        this.setMarker(this.addressLatLng);
      }
    }
  }

  private initializeMap(): void {
    if (this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    if (this.order && this.addressLatLng) {
      this.setMarker(this.addressLatLng);
    }
  }

  private showLocationOnReadonlyMode(): void {
    const m = this.map;
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);

    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }

  findMyLocation(): void {
    this.locationApi.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
        this.setMarker(latlng);
      }
    });
  }

  private setMarker(latlng: LatLngExpression): void {
    this.addressLatLng = latlng as LatLng;
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }
    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);

    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    });
  }

  set addressLatLng(latlng: LatLng) {
    if (!latlng.lat.toFixed) return;

    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
  }

  get addressLatLng(): LatLng {
    return this.order.addressLatLng!;
  }
}
