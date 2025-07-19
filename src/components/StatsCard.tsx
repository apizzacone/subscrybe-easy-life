import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient?: 'primary' | 'success' | 'warning';
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  gradient = 'primary' 
}: StatsCardProps) {
  const getGradientClass = () => {
    switch (gradient) {
      case 'success':
        return 'bg-gradient-success';
      case 'warning':
        return 'bg-gradient-to-br from-warning to-orange-400';
      case 'primary':
      default:
        return 'bg-gradient-primary';
    }
  };

  const getIconBgClass = () => {
    switch (gradient) {
      case 'success':
        return 'bg-success/10 text-success';
      case 'warning':
        return 'bg-warning/10 text-warning';
      case 'primary':
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 animate-scale-in">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-10 h-10 rounded-lg ${getIconBgClass()} flex items-center justify-center`}>
            <Icon className="h-5 w-5" />
          </div>
          {trend && (
            <div className={`text-xs px-2 py-1 rounded-full ${
              trend.isPositive 
                ? 'bg-success/10 text-success' 
                : 'bg-destructive/10 text-destructive'
            }`}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </div>
          )}
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </Card>
  );
}